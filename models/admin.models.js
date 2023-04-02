const mysql = require('../helpers/database');

//music list
exports.adminList = (cb) => {
    var str = ` SELECT * FROM tbl_admin;`;
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

// exports.musicCreate = (data, cb) => {
//     var str = `INSERT INTO tbl_music SET ?;`;
//     mysql.query_filter(str,data, function (err, row) {
//         if (err) {
//             cb(err, null);
//         } else {
//             if (row.length == 0) {
//                 cb(" Not Found!", null);
//             } else {
//                 cb(null, row);
//             }
//         }
//     })
// }


exports.getEditAdmin = (id, cb) => {
    var str = ` SELECT * FROM tbl_music WHERE music_id = ? ;`;
    mysql.query_filter(str,[id], function (err, row) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, row[0]);
        }
    })
}


exports.putEditAdmin = (id, data, cb) => {
    var str = `UPDATE tbl_music SET ? WHERE music_id = ? ;`;
    mysql.query_filter(str,[data, id], function (err, row) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, row);
        }
    });
}


exports.deleteAdmin = (id, cb) => {
    var str = ` DELETE FROM tbl_music WHERE music_id = ? ;`;
    mysql.query_filter(str,[id], function (err, row) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, row);
        }
    });
}
