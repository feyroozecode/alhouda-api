import  {   Request ,   Response   }     from   'express'
import  {   UserModel              }     from   '../db/documents/user.document'
import  {   HTTP_CODE              }     from   '../static_data/http_code'
import  {   USER_ROLES             }     from '../static_data/user_roles' 
import  {   SaveOptions            }     from 'mongoose'


/**
 * Get all users.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * Fetch all users from the database.
 */
export const getAllUsers = async (req: Request, res: Response) => {
    
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

/**
 * Get a user by ID.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * Fetch a user by their ID from the database.
 */
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
/**
 * Update a user by ID.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * Update a user's information by their ID.
 */
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


/**
 * Update the role of a user.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * Update the role of a user.
 */
export const updateRole = async (req: Request, res: Response, next: any) => {

    // Extract the role and user ID from the request body
    const { role, id } = req.body 

    // Check if both role and ID are provided
    if( role  && id ) {
        try {
             // Check if the new role is 'admin'
            if( role === USER_ROLES.ADMIN ) {
                 
                 // Find the user by the provided ID
                const user = await UserModel.findById(id)

                // If the user with the provided ID exists
                if(user !== null) { 
                    // Check if the user's current role is not already 'admin'
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
    
/**
 * Delete a user by ID.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * Delete a user by their ID.
 */
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