const mysql = require('../helpers/database');

//user list
exports.userList = (cb) => {
    var str = ` SELECT * FROM tbl_user;`;
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

exports.userCreate = (data, cb) => {
    var str = `INSERT INTO tbl_user SET ?;`;
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

exports.getEditUser = (id, cb) => {
    var str = ` SELECT * FROM tbl_user WHERE user_id = ? ;`;
    mysql.query_filter(str, [id], function(err, row) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, row[0]);
        }
    });
}

exports.putEditUser = (id, data, cb) => {
    var str = `UPDATE tbl_user SET ? WHERE user_id = ? ;`;
    mysql.query_filter(str, [data, id], function(err, row) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, row);
        }
    });
}


exports.deleteUser = (id, cb) => {
    var str = `DELETE FROM tbl_user WHERE user_id = ? ;`;
    mysql.query_filter(str, [id], function(err, row) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, row);
        }
    });
}