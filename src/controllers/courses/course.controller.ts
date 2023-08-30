import  {   Request ,   Response   }     from   'express'
import  {   CourseModel            }     from '../../db/documents/course.document';
import  {   Course                 }     from   '../../models/course.model'    
import  {   HTTP_CODE              }     from   '../../static_data/http_code'

// add course
export const addCourse = async (req: Request, res: Response) => {
    const {courseId, title, description, category, videos, audios, articles} = 
        req.body as unknown as Course;

    // validation 
    if(!courseId) {
        const error: Error = new Error('Course id is required')
        const statusCode: number = HTTP_CODE.BAD_REQUEST;
        return res.status(statusCode).json({message: error.message, error})
    }



    // add course to the db
    try {
        await CourseModel.create({
            courseId, title, description, category, videos, audios, articles
        }).then((course: any) => {
            res.status(HTTP_CODE.OK).json({
                message: 'Course added successfully',
                data: course
            })
        })
    } catch(error: any) {
        res.status(HTTP_CODE.BAD_REQUEST).json({
            message: 'Error adding course',
            errors: error.message
        })
    }
   
}

// get all courses 
export const getAllCourses = async (req: Request, res: Response) => {
        
        try{
            const courses = await CourseModel.find()
    
            res.status(HTTP_CODE.CREATED).json({
                message: 'Courses fetched successfully',
                data: courses
            })
        }  catch(error: any) {
            res.status(HTTP_CODE.BAD_REQUEST).json({
                message: 'Error fetching courses',
                errors: error.message
            })
        }
}

// get course by Id
export const getCourseById = async (req: any, res: Response) => {

    const { id} = req.params
    
    try {
        const course = CourseModel.findById(id)

        res.status(HTTP_CODE.OK).json({
            message: 'Course fetched successfully',
            data: course
        })
    } catch(error: any){ 
        res.status(HTTP_CODE.BAD_REQUEST).json({
            message: 'Error fetching course',
            errors: error.message
        })
    }
}

// update a single course 
export const updateCourseById = async (req: Request, res: Response) => {

    const { id } = req.params

    try {
        const updateCourse = await CourseModel.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        );

        if(!updateCourse) {
            return res.status(HTTP_CODE.NOT_FOUND).json({
                message: 'Course NOT FOUND'
            })
        }

        res.status(HTTP_CODE.OK).json({
            message: 'Course updated successfully',
            data: updateCourse
        })

    } catch(error: any ){
        return res.status(HTTP_CODE.BAD_REQUEST).json({
            message: 'Error updating course',
            errors: error.message
        })
    }
}

// delete course 
export const deleteCourseById = async (req: Request, res: Response) => {
    
    const { id } = req.params

    try {
        const deleteCourse = await CourseModel.findByIdAndDelete(id);

        if(!deleteCourse){
            return res.status(HTTP_CODE.NOT_FOUND).json({
                message: 'Course NOT FOUND'
            })
        }

        // delete 
        res.status(HTTP_CODE.OK).json({
            message: 'Course deleted successfully',
            data: deleteCourse
        })
    }
        catch(error: any) {
            res.status(HTTP_CODE.BAD_REQUEST).json({
                message: 'Error deleting course',
                errors: error.message
            })
        }

}