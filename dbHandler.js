var sqlite3 = require('sqlite3');

var conn; 

exports.getDbConn = getDbConn;
function getDbConn() {
    if(!conn) {
        conn = new sqlite3.Database('slackclone.db');
        console.log('opening database connection.');
    }
    return(conn);
}