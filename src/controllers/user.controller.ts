import {Request, Response}  from 'express'
import {UserModel} from '../db/documents/user.document'
import { HTTP_CODE } from '../static_data/http_code'

// get  all users 
export const getAllUsers = async (req: any, res: Response) => {
    
    try{
        const users = await UserModel.find()

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

// get user by id 
export const getUserById = async (req: any, res: Response) => {

    const {id} = req.params

    try {
        // find user by id 
        const user = await UserModel.findById(id)
        res.status(HTTP_CODE.OK).json({
            message: 'User fetched successfully',
            datas: user
        })
    } catch(error: any) {
        res.status(HTTP_CODE.BAD_REQUEST).json({
            message: 'Error fetching user',
            errors: error.message
        })
    }

}

// update user by id 
export const updateUserById = async ( req: Request, res: Response) => {

    const { id } = req.params

    try {
        // update user if not exists
        const updateUser = await UserModel.findByIdAndUpdate(
            id, 
            req.body,
            {new: true}
        );

        if(!updateUser) {
            return res.status(HTTP_CODE.NOT_FOUND).json({
                message: 'User NOT FOUND'
            })
        }

        res.status(HTTP_CODE.OK).json({
            message: 'User updated successfully',
            data: updateUser
        })
    } catch(error: any) {
        res.status(HTTP_CODE.BAD_REQUEST).json({
            message: 'Error updating user',
            errors: error.message
        })
    }
}


// delete user by id 
export const deleteUserById = async (req: Request, res: Response) => {
    
        const { id } = req.params
    
        try {
            // delete user if not exists
            const deleteUser = await UserModel.findByIdAndDelete(id);
    
            if(!deleteUser) {
                return res.status(HTTP_CODE.NOT_FOUND).json({
                    message: 'User NOT FOUND'
                })
            }
    
            res.status(HTTP_CODE.OK).json({
                message: 'User deleted successfully',
                data: deleteUser
            })
        } catch(error: any) {
            res.status(HTTP_CODE.BAD_REQUEST).json({
                message: 'Error deleting user',
                errors: error.message
            })
        }
}