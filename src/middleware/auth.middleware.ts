const  jwt                   = require('jsonwebtoken')
const { Request, Response }  = require('express')
const JWT_SECRET = 'cf53153beb78c340388324d8a29c0a8d7337f6eecca092864952ada4ed8024dcdbc905'
import   {  HTTP_CODE         }   from     '../static_data/http_code' 

/**
 * ADMIN AUTH
 */
export const adminAuth = (req: any, res: any , next: any) => {
    const token = req.cookies.jwt
    
    if( token ){
        jwt.verify( token, JWT_SECRET, (err: any, decodedToken: any) => {
            if( err ){
                const CODE: number = HTTP_CODE.UNAUTHORIZED;
                return res.status(401).json({
                    message: "Not authorized"
                })
            } else {
                if( decodedToken.role !== "admin" ) {
                    return res.status(401).json({ message: "Not authorized" })
                } else {
                    next();
                }
            }
        });
    } else {
        return res.status(401).json({ message: "Not authorized, token not available" })
    }

}


/**
 * USER BASIC AUTH
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const userAuth = (req: any, res: any, next: any ) => {
    const token = req.cookies.jwt

    if( token ) {
        jwt.verify( token , JWT_SECRET, (err: any, decodedToken: any) => {
            if ( err ) {
                return res.status(401).json({ message: "Not authorized" })
            }  else {
                if( decodedToken.role!== 'Basic' ) {
                    return res.status(401).json({ message: "Not authorized" })
                } else {
                    next()
                }
            }
        } );
    } else {
        return res.status(401).json({ message: "Not authorized, token not available" })
    }
}