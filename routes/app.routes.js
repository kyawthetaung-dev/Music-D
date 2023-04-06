var pagesController = require('../controllers/pages.controller');
var userController = require('../controllers/user.controller');
var musicController = require('../controllers/music.controller');
var adminController = require('../controllers/admin.controller');
var albumController = require('../controllers/album.controller');
var artistController = require('../controllers/artist.controller');

module.exports = (app) => {
    app.get('/', pagesController.getIndexPage);

    //#region music
    app.get('/music', pagesController.getMusicPage);
    app.get('/music/list', musicController.get_MusicList);
    //api
    app.get('/api/music/list', musicController.api_MusicList);
    app.get('/api/music/new/list', musicController.api_new_music);
    app.get('/api/music/trend/list', musicController.api_Music_trend_List);
    //
    app.post('/music/create', musicController.musicCreate);
    app.get('/music/edit/:id', musicController.getEditMusic);
    app.put('/music/edit/:id', musicController.putEditMusic);
    app.delete('/music/delete/:id', musicController.deleteMusic);
    // #endregion music

    //#region album
    app.get('/album', pagesController.getAlbumPage);
    app.get('/album/list', albumController.get_AlbumList);
    //api
    app.get('/api/album/list', albumController.getAlbumList);
    app.get('/api/album/detail/list/:id', albumController.get_album_detail_list);
    //
    app.post('/album/create', albumController.albumCreate);
    app.get('/album/edit/:id', albumController.getEditAlbum);
    app.put('/album/edit/:id', albumController.putEditAlbum);
    app.delete('/album/delete/:id', albumController.deleteAlbum);
    // #endregion album

    //#region artist
    app.get('/artist', pagesController.getArtistPage);
    app.get('/artist/list', artistController.getArtistList);
    app.post('/artist/create', artistController.artistCreate);
    app.get('/artist/edit/:id', artistController.getEditArtist);
    app.put('/artist/edit/:id', artistController.putEditArtist);
    app.delete('/artist/delete/:id', artistController.deleteArtist);
    // #endregion artist


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
    app.get('/admin/list', adminController.getAdminList);
    app.get('/admin/edit/:id', adminController.getEditAdmin);
    app.put('/admin/edit/:id', adminController.putEditAdmin);
    app.delete('/admin/delete/:id', adminController.deleteAdmin);
    // #endregion admin

};