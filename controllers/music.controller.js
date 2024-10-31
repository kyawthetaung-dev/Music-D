const { log } = require('console');
var musicModel = require('../models/music.models');

exports.api_MusicList = (req, res) => {
    musicModel.api_musicList((err, result) => {
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
exports.api_new_music = (req, res) => {
    musicModel.api_new_music((err, result) => {
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
exports.api_Music_trend_List = (req, res) => {
    musicModel.api_music_trend_List((err, result) => {
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
exports.get_MusicList = (req, res) => {
    musicModel.get_musicList((err, result) => {
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

exports.musicCreate = (req, res) => {
    var musicname = req.body.music_name;
    const data = {
        music_name: req.body.music_name,
        music_image: req.body.music_image,
        artist_id: req.body.artist_id,
        album_id: req.body.album_id,
        music_files: req.body.music_files,
    }
    musicModel.musicCreate(data, (err, result) => {
        if (err) {
            res.status(202).json({
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
                data: result
            })
        }
    });
}

exports.putEditMusic = (req, res) => {
    var id = req.params.id;
    const data = {
        music_name: req.body.edit_music_name,
        music_image: req.body.edit_music_image,
        artist_id: req.body.edit_artist_id,
        album_id: req.body.edit_album_id,
        music_files: req.body.edit_music_files,
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
                data: result
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
                data: result
            })
        }
    });
}