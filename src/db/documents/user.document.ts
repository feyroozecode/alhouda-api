import mongoose  from "mongoose";
import {User} from '../../models/user.model'

export interface UserDocument extends mongoose.Document {
    username: string;
    email: string;
    role: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, minLength: 6, required: true },
    email: { type: String, minLength: 6, required: true },
    role: { type: String, default: "Basic", required: true }
})

// export Schema on type of UserModel 
export const UserModel = mongoose.model<UserDocument>('User', userSchema)