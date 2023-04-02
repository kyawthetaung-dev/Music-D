var artistModel = require('../models/artist.models');

exports.getArtistList = (req, res) => {
    artistModel.artistList((err, result) => {
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
exports.artistCreate = (req, res) => {
    const data = {
        artist_name: req.body.artist_name,
        artist_image: req.body.artist_img,
        artist_gender: req.body.artist_gender,
    }
    console.log(data);
    artistModel.artistCreate(data,(err, result) => {
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


exports.getEditArtist = (req, res) => {
    var id = req.params.id;
    artistModel.getEditArtist(id, (err, result) => {
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

exports.putEditArtist = (req, res) => {
    var id = req.params.id;
    const data = {
        artist_name: req.body.edit_artist_name,
        artist_image: req.body.edit_artist_img,
        artist_gender: req.body.edit_artist_gender,
    }
    artistModel.putEditArtist(id, data, (err, result) => {
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


exports.deleteArtist = (req, res) => {
    var id = req.params.id;
    artistModel.deleteArtist(id, (err, result) => {
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