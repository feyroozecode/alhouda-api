const express   =  require('express')
const router    =  express.Router()

import {
    addScholar,
    getAllScholars,
    getScholarById,
    updateScholarById,
    deleteScholarById
} from '../controllers/scholar.controller'

router.get('/all', getAllScholars)
router.get('/:id', getScholarById)

// add scholar
router.post('/add', addScholar)

// update scholar by id
router.put('/:id', updateScholarById)

// delete scholar
router.delete('/:id', deleteScholarById)

export default router;