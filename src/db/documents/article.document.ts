import    mongoose from 'mongoose';
import { Article } from '../../../.history/src/models/article.model_20230828212538';
import { User } from '../../models/user.model';

export interface ArticleDocument extends mongoose.Document{
    articleId: string,
    title: string,
    content: string,
    author: User
}

/**
 * @class ArticleSchema 
 */

const ArticleSchema = new mongoose.Schema({
    articleId: { type: String },
    title: { type: String },
    content: {type: String},
    author: { type: User }
})

export const ArticleModel = mongoose.model<ArticleDocument>('Urticle', ArticleSchema)