const mysql = require('../helpers/database');

//music list
exports.albumList = (cb) => {
    var str = `select tbl_album.alb_image,tbl_album.alb_name,count(tbl_music.music_id) as music_count from tbl_album left join tbl_music on (tbl_music.album_id=tbl_album.alb_id) GROUP BY tbl_album.alb_id`;

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
    })
}

exports.albumCreate = (data, cb) => {
    var str = `INSERT INTO tbl_album SET ?;`;
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
    })
}


exports.getEditAlbum = (id, cb) => {
    var str = ` SELECT * FROM tbl_album WHERE alb_id = ? ;`;
    mysql.query_filter(str, [id], function(err, row) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, row[0]);
        }
    })
}


exports.putEditAlbum = (id, data, cb) => {
    var str = `UPDATE tbl_album SET ? WHERE alb_id = ? ;`;
    mysql.query_filter(str, [data, id], function(err, row) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, row);
        }
    });
}


exports.deleteAlbum = (id, cb) => {
    var str = ` DELETE FROM tbl_album WHERE alb_id = ? ;`;
    mysql.query_filter(str, [id], function(err, row) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, row);
        }
    });
}