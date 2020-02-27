const statusCodes  =require('../util/statusCodes');

exports.Users_API_Response = function (userData) {

    return new Promise(function (resolve) {
        if (userData) {
            let meta = {
                "Status_Code": statusCodes.OK,
                "Message": "Success"
            };

            let userDetails = {

                "User_Id": userData.User_Id,
                "User_Name": userData.User_Name,
                "Role": userData.Role
            }

            resolve({
                "metadata": meta,
                "userDetails": userDetails
            });
        }
    });
}