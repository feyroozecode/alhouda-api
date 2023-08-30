const express    =  require('express')
const router     =  express.Router()

import {
    register,
    login,
    updateRole
    /*login8*/
    
} from '../controllers/auth/auth.controller'

router.post('/register', register)
router.post('/login', login)
router.post('/updateRole', updateRole)

export default router;