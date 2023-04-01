var userModel = require('../models/user.models');

exports.getUserList = (req, res) => {
    userModel.userList((err, result) => {
        if (err) {
            res.status(200).json({
                "code": 404,
                "message": err
            })
        } else {
            res.status(200).json({
                "code": 200,
                "message": "Success",
                data : result
            })
        }
    });
}

exports.userCreate = (req, res) => {
    const data = {
        user_name: req.body.user_name,
        user_phone : req.body.user_phone,
        user_gender : req.body.gender,
    }
    console.log(`data`, data);
    userModel.userCreate(data,(err, result) => {
        if (err) {
            res.status(200).json({
                "code": 404,
                "message": err
            })
        } else {
            res.status(200).json({
                "code": 200,
                "message": "Success",
                data : result
            })
        }
    });
}

exports.getEditUser = (req, res) => {
    var id = req.params.id;
    userModel.getEditUser(id, (err, result) => {
        if (err) {
            res.status(200).json({
                "code": 404,
                "message": err
            })
        } else {
            res.status(200).json({
                "code": 200,
                "message": "Success",
                data : result
            })
        }
    });
}

exports.putEditUser = (req, res) => {
    var id = req.params.id;
    const data = {
        user_name: req.body.edit_user_name,
        user_phone: req.body.edit_user_phone,
        user_gender : req.body.edit_user_gender,
    }
    userModel.putEditUser(id, data, (err, result) => {
        if (err) {
            res.status(200).json({
                "code": 404,
                "message": err
            })
        } else {
            res.status(200).json({
                "code": 200,
                "message": "Success",
                data : result
            })
        }
    });
}


exports.deleteUser = (req, res) => {
    var id = req.params.id;
    userModel.deleteUser(id, (err, result) => {
        if (err) {
            res.status(200).json({
                "code": 404,
                "message": err
            })
        } else {
            res.status(200).json({
                "code": 200,
                "message": "Success",
                data : result
            })
        }
    });
}