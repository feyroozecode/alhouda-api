import { User }  from './user.model'
import { user } from '../../.history/src/models/user_20230820172455';
import { Course } from './course.model';

export class Ustaz extends User  {
    // init Ustaz
    constructor(
        public userId: number,
        public username: string,
        public email: string,
        public password: string,
        public role: string,

        // specific of a ustaz
        private bio : string,
        private profile_picture: string,
        private social_links: {
            facebook: string,
            twitter: string,
            youtube: string
        },
        public courses: Array<Course>
        
    ) {
        super(userId, username, email, password, role);
        this.bio = bio;
        this.profile_picture,
        this.social_links,
        this.courses = courses
    }

}