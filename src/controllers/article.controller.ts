import  {   Request ,   Response   }     from   'express'
import  {   ArticleModel            }     from '../db/documents/article.document';
import  {   Article                }     from   '..//models/article.model'    
import { HTTP_CODE } from '../static_data/http_code';

// add article 
export const addArticle = async (req: Request, res: Response ) => {

    const {title, content, author} = req.body  

    if(!title) {
        const error: Error = new Error('Article already exist');
        return res.status(HTTP_CODE.BAD_REQUEST).json({message: error.message, error })
    }

    const article = await ArticleModel.findOne({title: title});
    if(article) {
        const error: Error = new Error('Article already exist');
        return res.status(HTTP_CODE.BAD_REQUEST).json({message: error.message, error })
    }
    
    try {
        await ArticleModel.create({
            title, content, author
        }).then((article: any) => {

            res.status(HTTP_CODE.OK).json({
                message: 'Article created successufully', 
                data: article
            })
        })

    } catch(error: any){
        res.status(HTTP_CODE.BAD_REQUEST).json({
            message: 'Error adding article',
            errors: error.message
        })
    }

}

// get all articles
export const getAllArticles = async(req: Request, res: Response) => {

    try {
        const articles = await ArticleModel.find()

        res.status(HTTP_CODE.OK).json({
            message: "Fecth all articles",
            data: articles
        })

    } catch(error: any){
        res.status(HTTP_CODE.BAD_REQUEST).json({
            message: 'Error getting all articles',
            errors: error.message
        })
    }

}

// get single article
export const getArticleById = async (req: Request, res: Response) => {

    const { id }  = req.params

    try {
        const article = ArticleModel.findById(id)

        res.status(HTTP_CODE.OK).json({
            message: "getting a single article by id",
            data: article
        })
    } catch(error: any) {
        res.status(HTTP_CODE.BAD_REQUEST).json({
            message: "Error getting a single article",
            error: error.message
        })
    }

}

export const updateArticle = async (req: Request, res: Response) => {

    const { id } = req.params 

    try {
        const articleToUpdate = await ArticleModel.findByIdAndUpdate(
            id,
            req.body,
            {new : true}
        );
        
        res.status(HTTP_CODE.OK).json({
            message: 'Article updated sucesfully',
            data: articleToUpdate
        })

    } catch(error: any){
        res.status(HTTP_CODE.BAD_REQUEST).json({
            message: '',
            errors: error.message
        })
    }
}

// delete a article 
export const deleteArticle = async (req: Request, res: Response) => {

    const { id } = req.params

    try {
        const articleToDelete = ArticleModel.findByIdAndDelete(id)

        res.status(HTTP_CODE.OK).json({
            message: 'article deleted successfully',
            data: articleToDelete
        })
    } catch(error: any ){
        return res.status(HTTP_CODE.BAD_REQUEST).json({
            message: 'Error updating a article',
            errors: error.message
        })
    }

}
