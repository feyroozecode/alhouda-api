const express = require('express')
const router = express.Router()

import {
    register,
    /*login8*/
} from '../controllers/auth/auth.controller'

router.post('/register', register)

export default router;