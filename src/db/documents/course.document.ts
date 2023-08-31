import mongoose          from   'mongoose'
import { Video        }  from '../../models/video.model'
import { Audio        }  from '../../models/audio.model'
import { Article      }  from '../../models/article.model'

/**
 * @interface CourseDocument
 * @param {String} courseId
 * @param {String} title
 * @param {String} description
 * @param {Array<Video>} videos
 * @param {Array<Audio>} audios
 * @param {Array<Article>} articles
 */
export interface CourseDocument extends mongoose.Document {
    courseId: string,
    title: string,
    description: string,
    videos: Array<Video>,
    audios: Array<Audio>,
    articles: Array<Article>,
}

const courseSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        // comment this line 
        // this will generate a random id based on mongoType and reduce this 
        //value: () => reduceString(new mongoose.Types.ObjectId().toHexString()),
        unique: true,
    },
    title: {
        type: String,
        required: [true, "Le titre est recquis"]
    },
    description: {
        type: String,
    },
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }],
    audios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Audio'
    }],
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }],
})

export const CourseModel = mongoose.model<CourseDocument>('Course', courseSchema)