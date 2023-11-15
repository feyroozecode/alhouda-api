import  {   Request ,   Response   }     from   'express'
import { ScholarModel } from '../db/documents/scholar.document';
import  {   Course                 }     from   '../models/course.model'    
import  {   HTTP_CODE              }     from   '../static_data/http_code'
import { UserModel } from '../db/documents/user.document';

/**
 * 
 */
export const addScholar = async (req: Request, res: Response) => {

    const {
        username, email, password, role, 
        bio, profile_picture, social_links, courses} = 
            req.body as unknown as {
                username: string,email: string,  password: string, role: string, bio: string, 
                profile_picture: string, social_links: string, courses: Array<Course>
    }

    // validation 
    if(password.length < 6) {
        const error: Error = new Error('Password less than 6 characteres')
        const statusCode: number = HTTP_CODE.BAD_REQUEST;
        return res.status(statusCode).json({message: error.message, error})
    }

    // add Scholar to the db 
    try {
        await ScholarModel.create({
            username, email, password, role, 
            bio, profile_picture, social_links, courses
        }).then((scholar: any) => {
           res.status(HTTP_CODE.OK).json({
            message: 'Scholar added successfully',
            data: scholar
           })
        })
    }

    catch(error: any) {
        res.status(HTTP_CODE.BAD_REQUEST).json({
            message: 'Error adding scholar',
            errors: error.message
        })
    }
    
}

// gett all ustazs
export const getAllScholars = async (req: Request, res: Response) => {
        
        try{
            const ustazs = await ScholarModel.find()
    
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

// get a single scholar 
export const getScholarById = async (req: Request, res: Response) => {

    const {id} = req.params

    try{ 
        const scholar = await ScholarModel.findById(id)

        res.status(HTTP_CODE.OK).json({
            message: 'Scholar fetched successfully',
            data: scholar
        }) 
    } catch(error: any) {
        res.status(HTTP_CODE.BAD_REQUEST).json({
            message: 'Error fetching scholar',
            errors: error.message
        })
    }
}

// update a single scholar
export const updateScholarById = async (req: Request, res: Response) => {
    
        const { id } = req.params
    
        try {
            // update scholar if not exists
            const updateUstaz = await ScholarModel.findByIdAndUpdate(
                id, 
                req.body,
                {new: true}
            );
    
            if(!updateUstaz) {
                return res.status(HTTP_CODE.NOT_FOUND).json({
                    message: 'Scholar NOT FOUND'
                })
            }
    
            res.status(HTTP_CODE.OK).json({
                message: 'Scholar updated successfully',
                data: updateUstaz
            })
        } catch(error: any) {
            res.status(HTTP_CODE.BAD_REQUEST).json({
                message: 'Error updating scholar',
                errors: error.message
            })
        }
}

// delete a single scholar
export const deleteScholarById = async (req: Request, res: Response) => {

    const { id } = req.params

    try {
        // delete scholar if not exists
        const deleteUstaz = await ScholarModel.findByIdAndDelete(id);

        if(!deleteUstaz) {
            return res.status(HTTP_CODE.NOT_FOUND).json({
                message: 'Scholar NOT FOUND'
            })
        }

        res.status(HTTP_CODE.OK).json({
            message: 'Scholar deleted successfully',
            data: deleteUstaz
        })
    } catch(error: any) {
        res.status(HTTP_CODE.BAD_REQUEST).json({
            message: 'Error deleting scholar',
            errors: error.message
        })
    }

}