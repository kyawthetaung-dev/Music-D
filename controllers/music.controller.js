var musicModel = require('../models/music.models');

exports.getMusicList = (req, res) => {
    musicModel.musicList((err, result) => {
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


exports.getEditMusic = (req, res) => {
    var id = req.params.id;
    musicModel.getEditMusic(id, (err, result) => {
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

exports.putEditMusic = (req, res) => {
    var id = req.params.id;
    const data = {
        music_name: req.body.edit_musi_name,
        released_at : req.body.edit_released_date,
    }
    musicModel.putEditMusic(id, data, (err, result) => {
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


exports.deleteMusic = (req, res) => {
    var id = req.params.id;
    musicModel.deleteMusic(id, (err, result) => {
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