import logger from './logger.handler'


/// If any handler function in any routes ever call next callback with an error as paramater
/// It should by calling this function 
export default (error: any, req: any, res: any, next: any) => {
    logger.error(error.message | error);

    res.status(error.status || 500).json({
        message: error.message || 'Unexpected Server Error'
    })

}
