import { User } from '../../models/user.model'
import {Request, Response} from 'express'
import { HTTP_CODE } from '../../static_data/http_code' 


export const register: any = async (req: Request, res: Response, next: any) => {

    const {username, password } = req.body as unknown as {username: string, password: string}

    if(password.length < 6 ){
        const error = new Error('Password less than 6 characteres')
        const statusCode: number = HTTP_CODE.BAD_REQUEST;
        return res.status(statusCode).json({message: error.message, error})
    }
    
   try {
    await User.create({
        username, 
        password
    }).then((user: any) =>
        res.status(HTTP_CODE.OK).json({
            message: `User created successfully: ${user}`,
             user
        })
    )
   } catch(err: any) {
        res.status(HTTP_CODE.UNAUTHORIZED).json({
            message: `User already exists or not authorized: ${err}`,
            error: err.message 
        })
   } 
    

}