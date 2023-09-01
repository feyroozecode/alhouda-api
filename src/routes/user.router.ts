const express      =  require('express')
const router       =  express.Router()

import {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    updateRole
    /*login8*/
    
}                  from '../controllers/user.controller'
import { 
    adminAuth, 
   }               from './../middleware/auth.middleware';


router.get( '/all'          ,     getAllUsers )
router.get( '/:id'          ,     getUserById )

// update user by id
router.route('/:id').put(adminAuth,updateUserById )

router.post( '/updateRole'  ,     updateRole ) 

// add security 
// delete user
router.route('/:id').delete(adminAuth, deleteUserById )

export default router;