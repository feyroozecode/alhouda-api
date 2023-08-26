import  {   Request ,   Response   }     from   'express'
import { UstazModel } from '../db/documents/ustaz.document';
import  {   Course                 }     from   '../models/course.model'    
import  {   HTTP_CODE              }     from   '../static_data/http_code'

export const addUstaz = async (req: Request, res: Response) => {

    const {
        username, email, password, role, 
        bio, profile_picture, social_links, courses} = 
            req.body as unknown as {
                username: string,email: string,  password: string, role: string, bio: string, 
                profile_picture: string, social_links: string, courses: Array<Course>}

    // validation 
    if(password.length < 6) {
        const error: Error = new Error('Password less than 6 characteres')
        const statusCode: number = HTTP_CODE.BAD_REQUEST;
        return res.status(statusCode).json({message: error.message, error})
    }

    // add 
    try {
        await UstazModel.create({
            username, email, password, role, 
            bio, profile_picture, social_links, courses
        }).then((ustaz: any) => {
           res.status(HTTP_CODE.OK).json({
            message: 'Ustaz added successfully',
            data: ustaz
           })
        })
    }

    catch(error: any) {
        res.status(HTTP_CODE.BAD_REQUEST).json({
            message: 'Error adding ustaz',
            errors: error.message
        })
    }
    
}

// gett all ustazs
export const getAllUstazs = async (req: Request, res: Response) => {
        
        try{
            const ustazs = await UstazModel.find()
    
            res.status(HTTP_CODE.CREATED).json({
                message: 'Ustazs fetched successfully',
                data: ustazs
            })
        }  catch(error: any) {
            res.status(HTTP_CODE.BAD_REQUEST).json({
                message: 'Error fetching ustazs',
                errors: error.message
            })
        }
}

// get a single ustaz 
export const getUstazById = async (req: Request, res: Response) => {

    const {id} = req.params

    try{ 
        const ustaz = await UstazModel.findById(id)

        res.status(HTTP_CODE.OK).json({
            message: 'Ustaz fetched successfully',
            data: ustaz
        }) 
    } catch(error: any) {
        res.status(HTTP_CODE.BAD_REQUEST).json({
            message: 'Error fetching ustaz',
            errors: error.message
        })
    }
}

// update a single ustaz
export const updateUstazById = async (req: Request, res: Response) => {
    
        const { id } = req.params
    
        try {
            // update ustaz if not exists
            const updateUstaz = await UstazModel.findByIdAndUpdate(
                id, 
                req.body,
                {new: true}
            );
    
            if(!updateUstaz) {
                return res.status(HTTP_CODE.NOT_FOUND).json({
                    message: 'Ustaz NOT FOUND'
                })
            }
    
            res.status(HTTP_CODE.OK).json({
                message: 'Ustaz updated successfully',
                data: updateUstaz
            })
        } catch(error: any) {
            res.status(HTTP_CODE.BAD_REQUEST).json({
                message: 'Error updating ustaz',
                errors: error.message
            })
        }
}

// delete a single ustaz
export const deleteUstazById = async (req: Request, res: Response) => {

    const { id } = req.params

    try {
        // delete ustaz if not exists
        const deleteUstaz = await UstazModel.findByIdAndDelete(id);

        if(!deleteUstaz) {
            return res.status(HTTP_CODE.NOT_FOUND).json({
                message: 'Ustaz NOT FOUND'
            })
        }

        res.status(HTTP_CODE.OK).json({
            message: 'Ustaz deleted successfully',
            data: deleteUstaz
        })
    } catch(error: any) {
        res.status(HTTP_CODE.BAD_REQUEST).json({
            message: 'Error deleting ustaz',
            errors: error.message
        })
    }

}