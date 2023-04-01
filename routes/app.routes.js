var pagesController = require('../controllers/pages.controller');
var userController = require('../controllers/user.controller');
var musicController = require('../controllers/music.controller');

module.exports = (app) => {
    app.get('/', pagesController.getIndexPage);

    //#region music
    app.get('/music', pagesController.getMusicPage);
    app.get('/music/list', musicController.getMusicList);
    app.post('/music/create', musicController.musicCreate);
    app.get('/music/edit/:id', musicController.getEditMusic);
    app.put('/music/edit/:id', musicController.putEditMusic);
    app.delete('/music/delete/:id', musicController.deleteMusic);
    // #endregion music

    //#region video
    app.get('/video', pagesController.getVideoPage);
    // #endregion video

    //#region album
    app.get('/album', pagesController.getAlbumPage);
    // #endregion album

    //#region artist
    app.get('/artist', pagesController.getArtistPage);
    // #endregion artist

    //#region genre
    app.get('/genre', pagesController.getGenrePage);
    // #endregion genre

    //#region language
    app.get('/language', pagesController.getMusicLanguagePage);
    // #endregion language

    //#region  user
    app.get('/user', pagesController.getUserPage);
    app.get('/user/list', userController.getUserList);
    app.post('/user/create', userController.userCreate);
    app.get('/user/edit/:id', userController.getEditUser);
    app.put('/user/edit/:id', userController.putEditUser);
    app.delete('/user/delete', userController.deleteUser);

    //#endregion user

    //#region admin
    app.get('/admin', pagesController.getAdminPage);
    // #endregion admin

};