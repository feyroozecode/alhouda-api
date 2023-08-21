const express = require ('express')
const router = express.Router()
import registerRoute from './register.router'

router.use('/auth', registerRoute)

module.exports = router