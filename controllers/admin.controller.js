
var adminModel = require('../models/admin.models');

exports.getAdminList = (req, res) => {
    adminModel.adminList((err, result) => {
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
exports.musicCreate = (req, res) => {
    const data = {
        music_name: req.body.music_name,
        released_at : req.body.released_at,
    }
    console.log(data);
    musicModel.musicCreate(data,(err, result) => {
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


exports.getEditAdmin = (req, res) => {
    var id = req.params.id;
    adminModel.getEditAdmin(id, (err, result) => {
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

exports.putEditAdmin = (req, res) => {
    var id = req.params.id;
    const data = {
        admin_name: req.body.edit_admin_name,
        gender: req.body.edit_gender,
        admin_phone: req.body.edit_admin_ph,
        admin_email: req.body.edit_admin_email,
        password: req.body.edit_password,
    }
    adminModel.putEditAdmin(id, data, (err, result) => {
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


exports.deleteAdmin = (req, res) => {
    var id = req.params.id;
    adminModel.deleteAdmin(id, (err, result) => {
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