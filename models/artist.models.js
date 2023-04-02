const mysql = require('../helpers/database');

//music list
exports.artistList = (cb) => {
    var str = ` SELECT * FROM tbl_artist;`;
    mysql.query(str, function (err, row) {
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

exports.artistCreate = (data, cb) => {
    var str = `INSERT INTO tbl_artist SET ?;`;
    mysql.query_filter(str,data, function (err, row) {
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


exports.getEditArtist = (id, cb) => {
    var str = ` SELECT * FROM tbl_artist WHERE artist_id = ? ;`;
    mysql.query_filter(str,[id], function (err, row) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, row[0]);
        }
    })
}


exports.putEditArtist = (id, data, cb) => {
    var str = `UPDATE tbl_artist SET ? WHERE artist_id = ? ;`;
    mysql.query_filter(str,[data, id], function (err, row) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, row);
        }
    });
}


exports.deleteArtist = (id, cb) => {
    var str = ` DELETE FROM tbl_artist WHERE artist_id = ? ;`;
    mysql.query_filter(str,[id], function (err, row) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, row);
        }
    });
}
