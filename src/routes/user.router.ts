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

router.get( '/all'          ,     getAllUsers)
router.get( '/:id'          ,     getUserById)

// update user by id
router.put( '/:id'          ,     updateUserById)

router.post( '/updateRole'  ,     updateRole)

// delete user
router.delete( '/:id'       ,     deleteUserById)

export default router;