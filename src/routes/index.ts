const  express          =    require ('express')
const  router           =    express.Router()
import registerRoute   from  './register.router'
import userRoute       from  './user.router'
import ustazRoute      from  './ustaz.router'

router.use('/auth', registerRoute)

// user
router.use('/user', userRoute)
// ustaz
router.use('/ustaz', ustazRoute)

module.exports = router