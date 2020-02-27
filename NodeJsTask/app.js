const express = require('express');
const app = express();
const mongoose = require('mongoose');
const usersRouter = require('./routes/users.route')
const config = require('./config/config')
const statusCodes  =require('./util/statusCodes');
const logger = require('./util/logger')

let port = process.env.PORT || 8088

//mongoose connction
mongoose.connect(config.config.mongoURI.connectionString);
mongoose.connection.on('connected', () => {
    console.log('Connected to mongodb ');
});
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error in database connection: ' + err);
        logger.error('Error in database connection: ' + err);
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', usersRouter);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.Status_Code = statusCodes.NOT_FOUND;
    err.info = "Route not Found";
    next(err);
});
// error handler
app.use((err, req, res, next) => {
    if (err.isBoom) {
        console.log(err)
        var error = {
            "Status_Code": statusCodes.BAD_REQUEST,
            "Info": "check request body",
            "Error": err.output.payload.message
        };
        logger.error(JSON.stringify(error))
        res.status(statusCodes.BAD_REQUEST).send(error);
    }
    else {
        //404 Error
        if (err.statusCode == statusCodes.NOT_FOUND) {
            var errorMessage = {
                "Status_Code": statusCodes.NOT_FOUND,
                "Info": "Route not Found",
                "Error": err
            };
            logger.error(JSON.stringify(errorMessage))
            res.status(statusCodes.NOT_FOUND).json(errorMessage);
        }
        //400 Error
        else if (err.statusCode == statusCodes.BAD_REQUEST) {
            var errorMessage = {
                "Status_Code": statusCodes.BAD_REQUEST,
                "Info": "Bad Request",
                "Error": err.error
            };
            logger.error(JSON.stringify(errorMessage))
            res.status(statusCodes.BAD_REQUEST).json(errorMessage);
        }
        //500 Error
        else {
            res.status(statusCodes.INTERNAL_SERVER_ERROR).send(err);
            logger.error(JSON.stringify(err))
        }
    }

});
app.listen(port, () => {
    console.log("server is listening on port",`${port}`);
})
module.exports = app;