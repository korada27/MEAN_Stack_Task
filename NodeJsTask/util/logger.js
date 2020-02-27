const winston = require('winston');
const loggerLevel = process.env.LOGGER_LEVEL || "info" || "error";

//setting up logger formats
let alignColorsAndTime = winston.format.combine(

   winston.format.colorize(),
    winston.format.label({
        label:'[LOG]'
    }),
    winston.format.timestamp({
        format:"YYYY-MM-DD HH:mm:ss"
    }),
    winston.format.printf(
        info => ` ${info.label}  ${info.timestamp}  ${info.level}: ${info.message}`
    )
);

//creating a logger
const logger = winston.createLogger({
    format: winston.format.combine(  winston.format.colorize(),alignColorsAndTime),
    transports: [
        new winston.transports.File({
            filename: 'errors.log',
            level: 'error',
           handleExceptions: true,
            
        }),
        new winston.transports.Console({
            level: loggerLevel
        })
    ]
});

module.exports = logger;