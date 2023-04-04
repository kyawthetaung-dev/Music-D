var albumModel = require('../models/album.models');

exports.getAlbumList = (req, res) => {
    albumModel.albumList((err, result) => {
        if (err) {
            res.status(200).json({
                "code": 404,
                "message": err
            })
        } else {
            res.status(200).json({
                "code": 200,
                "message": "Success",
                data: result
            })
        }
    });
}
exports.albumCreate = (req, res) => {
    const data = {
        alb_name: req.body.album_name,
        alb_image: req.body.album_img,
    }
    console.log(data);
    albumModel.albumCreate(data, (err, result) => {
        if (err) {
            res.status(200).json({
                "code": 404,
                "message": err
            })
        } else {
            res.status(200).json({
                "code": 200,
                "message": "Success",
                data: result
            })
        }
    });
}


exports.getEditAlbum = (req, res) => {
    var id = req.params.id;
    albumModel.getEditAlbum(id, (err, result) => {
        if (err) {
            res.status(200).json({
                "code": 404,
                "message": err
            })
        } else {
            res.status(200).json({
                "code": 200,
                "message": "Success",
                data: result
            })
        }
    });
}

exports.putEditAlbum = (req, res) => {
    var id = req.params.id;
    const data = {
        alb_name: req.body.edit_album_name,
        alb_image: req.body.edit_album_img,
    }
    albumModel.putEditAlbum(id, data, (err, result) => {
        if (err) {
            res.status(200).json({
                "code": 404,
                "message": err
            })
        } else {
            res.status(200).json({
                "code": 200,
                "message": "Success",
                data: result
            })
        }
    });
}


exports.deleteAlbum = (req, res) => {
    var id = req.params.id;
    albumModel.deleteAlbum(id, (err, result) => {
        if (err) {
            res.status(200).json({
                "code": 404,
                "message": err
            })
        } else {
            res.status(200).json({
                "code": 200,
                "message": "Success",
                data: result
            })
        }
    });
}