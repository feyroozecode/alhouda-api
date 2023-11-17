import morgan from 'morgan';
import logger from '../lib/logger.handler';

const httpReqLogFormat = ':method :url :status :res[content-length] - :response-time ms';
const httpReqLogger  = morgan(httpReqLogFormat, { stream : logger.stream } );

export const loggerMiddleware = httpReqLogger