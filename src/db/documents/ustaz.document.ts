import     mongoose    from "mongoose";
import  {   Course   }  from '../../models/course.model'

export interface UstazDocument extends mongoose.Document {
  username: string,
  password: string,
  email: string,
  role: string,
  courses: Array<Course>,
  bio: string,
  profile_picture: string,
  social_media_handles: {
    facebook: string,
    twitter: string,
    linkedin: string,
    youtube: string
  }
}

/**
 * @class TeacherSchema 
 * @param {String} username
 * @param {String} email
 * @param {String} role
 * @param {String} password
 * @param {Array<Course>} courses
 * @param {String} bio
 * @param {String} profile_picture
 * @param {Object} social_media_handles
 */ 
const ustazSchema = new mongoose.Schema({
    username: { 
        type: String, 
        unique: true, 
        required: [true, "L'email est recquis" ]
    },
    password: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        minLength: 6, 
        required: true 
    },
    role: { 
        type: String, 
        default: "teacher", 
        required: true,
        enum: ['user', 'admin', 'staff', 'superviseur', 'teacher', 'ustaz']
    },
    courses: {
      type: mongoose.Schema.Types.Array,
      of: mongoose.Schema.Types.ObjectId,
      required: true
    },
    bio: {
      type: String,
      default: ""
    },
    profile_picture: {
      type: String,
      default: ""
    },
    social_media_handles: {
      facebook: {
        type: String,
        default: ""
      },
      twitter: {
        type: String,
        default: ""
      },
      linkedin: {
        type: String,
        default: ""
      },
      youtube: {
        type: String,
        default: ""
      }
    }
})

export const UstazModel = mongoose.model<UstazDocument>('Ustaz', ustazSchema)