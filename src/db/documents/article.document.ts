import    mongoose from 'mongoose';
import { User } from '../../models/user.model';
import { UserModel } from './user.document';

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
    author: { type:  mongoose.Schema.Types.ObjectId, ref: UserModel, required: true, autopopulate: { select: 'username email' } }
})

export const ArticleModel = mongoose.model<ArticleDocument>('Urticle', ArticleSchema)