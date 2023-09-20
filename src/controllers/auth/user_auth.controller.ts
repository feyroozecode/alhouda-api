import   {  UserModel         }   from     '../../db/documents/user.document'
import   {  Request, Response }   from     'express'
import   {  HTTP_CODE         }   from     '../../static_data/http_code' 
const    bcrypt               =   require  ( 'bcryptjs')
const    jwt                  =   require  ( 'jsonwebtoken' )
import { 
    adminAuth, 
    userAuth
   }                              from '../../middleware/auth.middleware';

/**
 * Variables and constantes
 */
// json web token secret
const JWT_SECRET  = 'b7ac71b4d98bb826af95f9225e2256159352d1cfece46bf9f9425ec98697a8f88efb3b'

// Time to expire for the JWT
const TOKEN_MAX_TIME = 3 * (60*60)

/**
 * @Controller for user registration.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * Register a new user by checking if the user exists and creating a JWT.
 */

export const register: any = async (req: Request, res: Response, next: any) => {

    const {username, email, password } = req.body as unknown as {username: string,email: string,  password: string}

    // Check if the password is less than 6 characters
    if(password.length < 6 ){
        const error: Error = new Error('Password less than 6 characteres')
        const statusCode: number = HTTP_CODE.BAD_REQUEST;
        return res.status(statusCode).json({message: error.message, error})
    }

   // check if user already exists
   try {
    bcrypt.hash(password, 10).then(async (hash: any) => {
        await UserModel.create({
            username,
            email,
            password: hash
         }).then((user: any) => {
            
            // create a token for the user 
            const token = jwt.sign(
                { id: user._id, username, role: user.role },
                JWT_SECRET,
                {
                    expiresIn: TOKEN_MAX_TIME
                }    
            );

            // set the token in the cookie 
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: TOKEN_MAX_TIME * 1000  // 3 Hours in ms
            })

            res.status(HTTP_CODE.CREATED).json({
                message: `User created successfully: ${user}`,
                user: user._id
            });

            //console.log(('Request:'), req.method, req.url);
        }
        )
    })
   } catch(err: any) {
        res.status(HTTP_CODE.UNAUTHORIZED).json({
            message: `User already exists or not authorized: ${err}`,
            error: err.message 
        })
   } 
    

}

/**
 * Function to log in a user.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * Authenticate and log in a user by creating a JWT.
 */
export const login = async (req: Request, res: Response, next: any) => {   

    // Check if username or password is missing
    const { username, password } = req.body

    if(!username || !password ) {
        return res.status(HTTP_CODE.UNAUTHORIZED).json({
                message: "User or password not present" ,
               
        })
    }

    try {
        const user = await UserModel.findOne({ username })

        if(!user){
            return res.status(HTTP_CODE.UNAUTHORIZED).json({
                message: "Email or Password are inccorrect or not found",
                error: "User not found" 
            })
        }
        else {
            bcrypt.compare(password, user.password).then( function(result: any) {

                if(result){
                   // create a token for the user 
                    const token = jwt.sign(
                        { id: user._id, username, role: user.role },
                        JWT_SECRET,
                        {
                            expiresIn: TOKEN_MAX_TIME
                        }    
                    );

                    // set the token in the cookie 
                    res.cookie('jwt', token, {
                        httpOnly: true,
                        maxAge: TOKEN_MAX_TIME * 1000  // 3 Hours in ms
                    })
 
                    // send the response  
                    res.status(HTTP_CODE.OK).json({
                        message: "User successful logged in ",
                        user: user._id 
                    });

                } else {
                    res.status(HTTP_CODE.BAD_REQUEST).json({
                        message: "Login not successful",
                        error: "Password not correct" 
                    })
                }

            })
        }
    } catch(error: any){
        res.status(HTTP_CODE.BAD_REQUEST).json({
            message: "An error occured ",
            error: error.message
        })
    }

}
