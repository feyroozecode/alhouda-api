import {Request, Response}  from 'express'
import {User} from '../models/user.model'
import { HTTP_CODE } from '../static_data/http_code'

export const getAllUsers = async (req: any, res: Response) => {
    
    try{
        const users = await User.find()

        res.status(HTTP_CODE.CREATED).json({
            message: 'Users fetched successfully',
            data: users
        })
    }  catch(error: any) {
         res.status(HTTP_CODE.BAD_REQUEST).json({
            message: 'Error fetching users',
            errors: error.message
        })
    }
}