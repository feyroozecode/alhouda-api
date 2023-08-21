const express = require ('express')
const router = express.Router()
import registerRoute from './register.router'
import userRoute from './user.router'

router.use('/auth', registerRoute)

// user
router.use('/user', userRoute)

module.exports = router