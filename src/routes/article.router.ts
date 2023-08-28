import      express          from  'express'
import {
            addArticle,
            getAllArticles,
            getArticleById,
            updateArticle,
            deleteArticle
        }                    from '../controllers/article.controller'


const router = express.Router();

// add article
router.post('/add', addArticle)

// update article
router.put('/:id', updateArticle)

// get all articles 
router.get('/all', getAllArticles)
// get single article 
router.get('/:id', getArticleById)

// delete  article 
router.delete(':/id', deleteArticle)

// export the router 
export default router;
