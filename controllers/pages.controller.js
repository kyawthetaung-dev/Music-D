var userModel = require('../models/user.models');

exports.getIndexPage = (req, res) => {
    res.render('pages/index', {
        title : 'Music App',
    });
}


exports.getMusicPage = (req, res) => {
    res.render('pages/music', {
        title : 'Music Page',
    });
}

exports.getVideoPage = (req, res) => {
    res.render('pages/mv', {
        title : 'Video Page',
    });
}

exports.getAlbumPage = (req, res) => {
    res.render('pages/album', {
        title : 'Album Page',
    });
}


exports.getArtistPage = (req, res) => {
    res.render('pages/artist', {
        title : 'Artist Page',
    });
}

exports.getGenrePage = (req, res) => {
    res.render('pages/genre', {
        title : 'Genre Page',
    });
}

exports.getMusicLanguagePage = (req, res) => {
    res.render('pages/music_language', {
        title : 'MusicLanguage Page',
    });
}

exports.getUserPage = (req, res) => {
    res.render('pages/user', {
        title : 'User Page',
    });
}

exports.getAdminPage = (req, res) => {
    res.render('pages/admin', {
        title : 'Admin Page',
    });
}
