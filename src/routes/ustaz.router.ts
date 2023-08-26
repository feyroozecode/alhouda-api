const express   =  require('express')
const router    =  express.Router()

import {
    addUstaz,
    getAllUstazs,
    getUstazById,
    updateUstazById,
    deleteUstazById
} from '../controllers/ustaz.controller'

router.get('/all', getAllUstazs)
router.get('/:id', getUstazById)

// add ustaz
router.post('/add', addUstaz)

// update ustaz by id
router.put('/:id', updateUstazById)

// delete ustaz
router.delete('/:id', deleteUstazById)

export default router;