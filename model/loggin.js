var db = require("./databaseConfig");
var app = require("../controller/app");
var config=require('../config.js'); 
var jwt=require('jsonwebtoken');

var userDB = {
  getLogginUser: function (email,role,password,callback) {
    var conn = db.getConnection();
    conn.connect(function (err) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else {
        console.log("Connected!");
        var sql = "SELECT * FROM user WHERE email=? AND role=? AND password=?";
        conn.query(sql, [email,role,password], function (err, result) {
          conn.end();
          if (err) {
            console.log(err);
            return callback(err, null);
          } else {
            var token = "";
            console.log(result)
            if((result.length == 1) && (result[0].role == "admin")){
              token = jwt.sign({email:result[0].email, role: result[0].role,password:result[0].password},config.key,{expiresIn: 86400})
              return callback(null,token)
            }
              return callback(null,result)
            
          }
        });
      }
    });
  },
};

module.exports = userDB;


