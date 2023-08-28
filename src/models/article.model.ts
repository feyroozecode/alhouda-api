import { User } from "./user.model"

export class Article {

    constructor(
            private articleId: string, 
            private author: User,
            private title: string, 
            private content: string
        ){
        this.articleId,
        this.title,
        this.content
        this.author
    }
}