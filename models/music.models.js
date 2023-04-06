const mysql = require('../helpers/database');

//music list
exports.api_musicList = (cb) => {
        // var str = `select music.music_name,music_image,music.music_files,album.alb_name,artist.artist_name from ((tbl_music music
        //             inner join tbl_album album on music.album_id= album.alb_id)
        //             inner join tbl_artist artist on music.artist_id= artist.artist_id)`;
        var str = `select music_name,music_image,music_files ,artist_name from tbl_music join tbl_artist on tbl_music.artist_id=tbl_artist.artist_id`;
        mysql.query(str, function(err, row) {
            if (err) {
                cb(err, null);
            } else {
                if (row.length == 0) {
                    cb(" Not Found!", null);
                } else {
                    cb(null, row);
                }
            }
        });
    }
    //new music
exports.api_new_music = (cb) => {

        var str = `SELECT tbl_album.alb_image,tbl_artist.artist_name,music_name,music_files
    FROM ((tbl_music 
    INNER JOIN tbl_album ON tbl_music.album_id = tbl_album.alb_id)
    INNER JOIN tbl_artist ON tbl_music.artist_id = tbl_artist.artist_id)
    WHERE tbl_music.music_id in (1,7,12,15,19,23)`;
        mysql.query(str, function(err, row) {
            if (err) {
                cb(err, null);
            } else {
                if (row.length == 0) {
                    cb(" Not Found!", null);
                } else {
                    cb(null, row);
                }
            }
        });
    }
    //music trend list
exports.api_music_trend_List = (cb) => {

        var str = `SELECT tbl_album.alb_image,tbl_artist.artist_name,music_name,music_files
    FROM ((tbl_music 
    INNER JOIN tbl_album ON tbl_music.album_id = tbl_album.alb_id)
    INNER JOIN tbl_artist ON tbl_music.artist_id = tbl_artist.artist_id)
    WHERE tbl_music.music_id in (4,6,12,15,18)`;
        mysql.query(str, function(err, row) {
            if (err) {
                cb(err, null);
            } else {
                if (row.length == 0) {
                    cb(" Not Found!", null);
                } else {
                    cb(null, row);
                }
            }
        });
    }
    //get music list
exports.get_musicList = (cb) => {
        // var str = `select music.music_name,music_image,music.music_files,album.alb_name,artist.artist_name from ((tbl_music music
        //             inner join tbl_album album on music.album_id= album.alb_id)
        //             inner join tbl_artist artist on music.artist_id= artist.artist_id)`;
        var str = `select * from tbl_music`;
        mysql.query(str, function(err, row) {
            if (err) {
                cb(err, null);
            } else {
                if (row.length == 0) {
                    cb(" Not Found!", null);
                } else {
                    cb(null, row);
                }
            }
        });
    }
    //music create
exports.musicCreate = (data, cb) => {
    var str = `INSERT INTO tbl_music SET ?;`;
    mysql.query_filter(str, data, function(err, row) {
        if (err) {
            cb(err, null);
        } else {
            if (row.length == 0) {
                cb(" Not Found!", null);
            } else {
                cb(null, row);
            }
        }
    });
}

//editmusic
exports.getEditMusic = (id, cb) => {
    var str = ` SELECT * FROM tbl_music WHERE music_id = ? ;`;
    mysql.query_filter(str, [id], function(err, row) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, row[0]);
        }
    });
}

//editmusic
exports.putEditMusic = (id, data, cb) => {
    var str = `UPDATE tbl_music SET ? WHERE music_id = ? ;`;
    mysql.query_filter(str, [data, id], function(err, row) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, row);
        }
    });
}

//delete music
exports.deleteMusic = (id, cb) => {
        var str = ` DELETE FROM tbl_music WHERE music_id = ? ;`;
        mysql.query_filter(str, [id], function(err, row) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, row);
            }
        });
    }
    //music count
exports.musicCount = (cb) => {
    var str = ` SELECT COUNT(music_id) as music_count FROM tbl_music;`;
    mysql.query_filter(str, function(err, row) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, row);
        }
    });
}