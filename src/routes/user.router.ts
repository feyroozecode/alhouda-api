const express = require('express')
const router = express.Router()

import {
    getAllUsers,
    getUserById,
    updateUserById
    /*login8*/
    
} from '../controllers/user.controller'

router.get('/all', getAllUsers)
router.get('/', getUserById)

// update user by id
router.put('/:id', updateUserById)

export default router;