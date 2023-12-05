let mysql = require('mysql');

var dbconnect = {
    getConnection: function() {
    var conn =    mysql.createConnection({
    host: "mydatabaseserver.codkplyaeapn.us-east-1.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "12345678",
    database: "moviedatabase",
    
}); 
     
    return conn;

}};

module.exports = dbconnect;