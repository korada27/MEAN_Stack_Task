const mongoose = require('mongoose');

// added validations for value of email-address field 
const usersSchema = mongoose.Schema({
    User_Name: String,
    Email_Address: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid']},
    Is_Admin: Boolean,
    Created_By: String,
    Created_On: Date,
    City: String
});

// restricted the values for Role field
const rolesSchema = mongoose.Schema({
    User_Id: String,
    User_Name: String,
    Role: { type: String, enum: ['admin','non-admin'] }
});

let usersModel = mongoose.model('users', usersSchema, 'users');

let rolesModel = mongoose.model('roles', rolesSchema, 'roles');

module.exports = {
    usersModel: usersModel,
    rolesModel: rolesModel
} 