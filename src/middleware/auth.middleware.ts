const  jwt                   = require('jsonwebtoken')
const { Request, Response }  = require('express')
const JWT_SECRET = 'b7ac71b4d98bb826af95f9225e2256159352d1cfece46bf9f9425ec98697a8f88efb3b'
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