var db = require("./databaseConfig");
var app = require("../controller/app");

var deletegenreDB = {
  deletegenre : function (genreID,callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        const sql = "DELETE FROM genre WHERE genreID = ?";
        conn.query(sql,[genreID],function (err, result) {
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

module.exports = deletegenreDB;

