import      express             from 'express'
import {
            addCourse,
            getAllCourses,
            getCourseById,
            updateCourseById,
            deleteCourseById
}                               from   '../controllers/courses/course.controller'

// init a router 
const router =     express.Router();

// add course 
router.post('/add', addCourse)

// get all course
router.get('/all', getAllCourses)

// get by id 
router.get('/:id', getCourseById)

// update a course
router.put('/:id', updateCourseById)

// delete a course
router.delete('/:id', deleteCourseById)

// export a router 

export default router;