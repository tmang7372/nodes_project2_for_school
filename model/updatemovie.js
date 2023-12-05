var db = require("./databaseConfig");
var app = require("../controller/app");

var updatemovieDB = {
  updatemovie : function (updatabody,genreID,callback) {
    console.log(updatabody)
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        const sql = "Update movie SET ? WHERE genreID = ?";
        conn.query(sql,[updatabody,genreID],function (err, result) {
          conn.end();
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            return callback(null, result);
          }
        });
      }
    });
  },
};

module.exports = updatemovieDB;

