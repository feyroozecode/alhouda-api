const  express          =    require ('express')
const  router           =    express.Router()
import registerRoute   from  './auth.router'
import userRoute       from  './user.router'
import scholarRoute      from  './scholar.router'
import courseRoute     from  './course.router'
import articleRoute    from  './article.router'

// test
router.get('/', function (req: Request, res: any) { res.send('Alhamdoullah all is working fine !')})

// auth 
router.use('/auth', registerRoute)
// user
router.use('/user', userRoute)
// ustaz
router.use('/ustaz', scholarRoute)
// course
router.use('/course', courseRoute)
// article 
router.use('/article', articleRoute)

module.exports = router