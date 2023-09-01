import   {  UserModel         }   from    '../../db/documents/user.document'
import   {  Request, Response }   from    'express'
import   {  HTTP_CODE         }   from     '../../static_data/http_code' 
const    colors               =   require  ( 'colors')
const    bcrypt               =   require  ( 'bcryptjs')
const    jwt                  =   require  ( 'jsonwebtoken' )


/**
 * Variables and constantes
 */

// json web token secret
const JWT_SECRET  = 'cf53153beb78c340388324d8a29c0a8d7337f6eecca092864952ada4ed8024dcdbc905'

// Time to expire for the JWT
const TOKEN_MAX_TIME = 3 * (60*60)

/**
 *  @Controller to handle registration of new users 
 *  @param {Request} req 
 *  @param {Response} res
 *  Register a new User by checking a user exist or not 
 */ 

export const register: any = async (req: Request, res: Response, next: any) => {

    const {username, email, password } = req.body as unknown as {username: string,email: string,  password: string}

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

            console.log(colors.orange('Request:'), req.method, req.url);
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
 *  function for login user 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const login = async (req: Request, res: Response, next: any) => {   

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
