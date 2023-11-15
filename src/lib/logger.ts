import path     from 'path';
import winston  from 'winston'

const { timestamp, label, combine, json } = winston.format;

const logDir = `${path.resolve('./')}/logs`;

const logger: any = winston.createLogger({
    format: combine(
        label({ 'label': 'request' }), timestamp(),
        json(),
    ),
    transports: [
        new winston.transports.Console({ handleExceptions: true }),
        new winston.transports.File({ filename: `${logDir}/combined.log` })
    ]
});

logger.stream = {
    write: (message: any, encoding: any) => {
        logger.info(message)
    }
}

export default logger;