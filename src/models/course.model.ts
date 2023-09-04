import    {  Audio   }   from './audio.model'
import    {  Video   }   from './video.model'
import    {  Article }   from './article.model'

export class Course {
   constructor(
        public courseId: string,
        public title: string, 
        public description: string, 
        public category: string, 
        public videos: Array<Video>,
        public audios: Array<Audio>,
        public articles: Array<Article>,
    ) {
        this.courseId = courseId;
        this.title = title;
        this.description = description;
        this.category = category;
        this.videos = videos;
        this.audios = audios;
        this.articles = articles;
    }
    
}