const Joi = require('joi');

let user_Request = {
    body: {
        First_Name: Joi.string().required(),
        Last_Name: Joi.string().required().default(""),
        // email is required
        // email must be a valid email string
        Email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
    }
};

module.exports = {
    user_Request: user_Request
}