const express    =  require('express')
const router     =  express.Router()

import {
    register,
    login,
    /*login8*/
    
} from '../controllers/auth/user_auth.controller'

router.post('/register', register)
router.post('/login', login)

export default router;