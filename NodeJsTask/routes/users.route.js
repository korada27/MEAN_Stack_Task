const express = require('express');
const router = express.Router();
const expressJoi = require('express-joi-validator');
const userSchema = require('../schema/users.schema');
const userService = require('../services/users.service');
const logger = require('../util/logger');


router.post('/users', expressJoi(userSchema.user_Request), function (req, res, next) {
    logger.info("enetred into create use route")
    userService.createUser(req.body, res).then(function (response) {
        res.send(response)
    }).catch(next)
})

module.exports = router;


