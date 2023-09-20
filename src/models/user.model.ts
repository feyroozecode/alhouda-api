/** 
* This is the user model class which defines the attributes of a user.
*/

export class User {
    constructor(
        public userId: number,
        public username: string,
        public email: string,
        public role: string,
        public password: string, 
       
    ) { 
        //super(userId, username, role, email, password);
        // init
        this.userId = userId,
        this.username = username,
        this.email = email,
        this.role = role,
        this.password = password
    }
}