import   {  UserModel         }   from '../../db/documents/user.document'
import   {  Request, Response }   from 'express'
import   {  HTTP_CODE         }   from '../../static_data/http_code' 
import   {  USER_ROLES        }   from '../../static_data/user_roles' 
import   { SaveOptions        }   from 'mongoose'


/**
 *
 *  @Controller to handle registration of new users 
 *  @param {Request} req 
 *  @param {Response} res
 *  Register a new User by checking a user exisit or not 
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
     await UserModel.create({
        username,
        email,
        password
     }).then((user: any) => {
        res.status(HTTP_CODE.OK).json({
            message: `User created successfully: ${user}`,
             user
        })
        console.log(user);
    }
    )
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

    try {
        const user = await UserModel.findOne({ username, password })

        if(!user){
            return res.status(HTTP_CODE.UNAUTHORIZED).json({
                message: "Login Not Found",
                error: "User not found" 
            })
        }
        else {
            res.status(HTTP_CODE.OK).json({
                message: "Login successfully",
                data: user 
            })
        }
    } catch(error: any){
        res.status(HTTP_CODE.BAD_REQUEST).json({
            message: "An error occured ",
            error: error.message
        })
    }

}


/**
 * Update the role of a user.
 *
 * @param {Request} req - The request object containing the new role and user ID.
 * @param {Response} res - The response object used to send the result back to the client.
 * @param {any} next - The next function in the middleware chain.
 * @returns {void}
 */
export const updateRole = async (req: Request, res: Response, next: any) => {

    const { role, id } = req.body 

    // if user role and id exist 
    if( role  && id ) {
        try {

            if( role === USER_ROLES.ADMIN ) {
                 
                const user = await UserModel.findById(id)

                if(user !== null) {
                    if(user.role !== USER_ROLES.ADMIN){
                        user.role = role;  // change the role
                            
                        try {
                            await user.save();  // save a user with update 

                            res.status(HTTP_CODE.CREATED).json({
                                message: "Update user role successfully",
                                data: user
                            });
                        } catch(error: any){
                             res.status(HTTP_CODE.BAD_REQUEST).json({
                                message: "An error occurred",
                                error: error.message
                            });
                        }
                        
                    }
                    else {
                        res.status(HTTP_CODE.BAD_REQUEST).json({
                            message: "Role is already admin"
                        });
                    }
                } 
                else {
                    res.status(HTTP_CODE.NOT_FOUND).json({
                        message: "User not found"
                    });
                }
            }
        }
        catch(error: any) {
            res.status(HTTP_CODE.INTERNAL_SERVER_ERROR).json({
                    message: "An error occurred",
                    error: error.message
                });
        }
    }
}