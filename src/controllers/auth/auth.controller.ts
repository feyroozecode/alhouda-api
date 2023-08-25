import   {  UserModel         }   from '../../db/documents/user.document'
import   {  Request, Response }   from 'express'
import   {  HTTP_CODE         }   from '../../static_data/http_code' 

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