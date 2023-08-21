const express = require('express')
const router = express.Router()

import {
    getAllUsers,
    /*login8*/
    
} from '../controllers/user.controller'

router.get('/all', getAllUsers)

export default router;