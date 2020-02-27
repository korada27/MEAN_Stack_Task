const Models = require('../model/collectionmodel');
const Users_Response = require('../responseBuilder/users.response')
const logger = require('../util/logger')
const statusCodes  =require('../util/statusCodes');

//creating user 
exports.createUser = function (data, res) {
    logger.info("Entering into createUser service")
    return new Promise(function (resolve, reject) {
        if (data) {
            //getting data from users collection
            Models.usersModel.find().then(function (response) {

                if (!response.length) {

                    //if no data is there in users collection so, making 1st user as admin in roles collection
                    // after user creation in users collection and Is_Admin flag to true in users collection
                    Models.usersModel.create({
                        User_Name: data.First_Name + "" + data.Last_Name,
                        Email_Address: data.Email,
                        Created_On: new Date(),
                        Created_By: data.First_Name + "" + data.Last_Name,
                        City: data.city ? data.city : "",
                        Is_Admin: "true"
                    }).then(function (db_data) {
                        Models.rolesModel.create({
                            User_Id: db_data._id,
                            User_Name: data.First_Name + "" + data.Last_Name,
                            Role: "admin"
                        }).then(async function (userData) {
                            let finalResponse = await Users_Response.Users_API_Response(userData);
                            resolve(finalResponse)
                        }).catch(function (err) {
                            reject({
                                "Status_Code": statusCodes.INTERNAL_SERVER_ERROR,
                                "Message": "Error occurred while creating user in roles " + err
                            })
                        })
                    }).catch(function (err) {
                        reject({
                            "Status_Code": statusCodes.INTERNAL_SERVER_ERROR,
                            "Message": "Error occurred while creating user " + err
                        })
                    })
                } else {

                    // user details are there in users collection so, set role to non-admin and Is_Admin to false for a particular user 
                    Models.usersModel.create({
                        User_Name: data.First_Name + "" + data.Last_Name,
                        Email_Address: data.Email,
                        Created_On: new Date(),
                        Created_By: data.First_Name + "" + data.Last_Name,
                        City: data.city ? data.city : "",
                        Is_Admin: "false"
                    }).then(function (db_data) {
                        Models.rolesModel.create({
                            User_Id: db_data._id,
                            User_Name: data.First_Name + "" + data.Last_Name,
                            Role: "non-admin"
                        }).then(async function (userData) {
                            let finalResponse = await Users_Response.Users_API_Response(userData);
                            resolve(finalResponse)
                        }).catch(function (err) {
                            reject({
                                Status_Code: statusCodes.INTERNAL_SERVER_ERROR,
                                Message: "Error occurred while creating user in roles " + err
                            })
                        })
                        //
                    }).catch(function (err) {
                        reject({
                            "Status_Code": statusCodes.INTERNAL_SERVER_ERROR,
                            "Message": "Error occurred while creating user  " + err
                        })
                    })
                }
            }).catch(function (err) {
                reject({
                    "Status_Code": 500,
                    "Message": "Error occurred getting users data " + err
                })
            })
        } else {
            reject({
                "Status_Code": 400,
                "Message": "Send valid user data"
            })
        }
    })
}