import mongoose  from "mongoose";

/**
 * @interface UserDocument
 * @param {String} username
 * @param {String} email
 * @param {String} role
 * @param {String} password
 */
export interface UserDocument extends mongoose.Document {
    username: string;
    email: string;
    role: string;
    password: string;
}

/**
 * @class UserSchema 
 * @param {String} username
 * @param {String} email
 * @param {String} role
 * @param {String} password
 */ 
const userSchema = new mongoose.Schema({
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
        default: "user", 
        required: true,
        enum: ['user', 'admin', 'staff', 'supervisor', 'ustaz']
    }
})

// export Schema on type of UserModel 
export const UserModel = mongoose.model<UserDocument>('User', userSchema)