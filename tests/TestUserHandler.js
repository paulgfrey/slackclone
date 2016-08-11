// TestUserHandler - test all the user functions
var sqlite3 = require('sqlite3');
var expect = require('expect.js');


var userHandler = require("../userhandler.js");
var db = new sqlite3.Database('testslackclone.db');

describe('Test getUserJSON', () => {
  beforeEach(() => { 
      console.log('BEGIN');
      db.exec("BEGIN");
  });
  afterEach(() => {
      console.log('ROLLBACK');
      db.exec("ROLLBACK");
  });
  it('#1 getUserProfileJSON', () => {
    var userId = 1;
    var user = { id: userId, name: "shuvo", password: "QWERWRER", email: "BLASHS@GMAIL.COM" };
    var expected = JSON.stringify(user);
    var actual = userHandler.getUserProfileJSON(db, userId).then({
        
    })
    console.log('expected=' + expected);
    console.log('actual=' + actual);
    expect(expected).to.equal(actual);
   })
});

describe('Test createUserProfile', () => {
  beforeEach(() => { 
      console.log('BEGIN');
      db.exec("BEGIN");
  });
  afterEach(() => {
      console.log('ROLLBACK');
      db.exec("ROLLBACK");
  });
  it('#1 createUserProfile', () => {
    var userId = 1;
    var user = { id: userID, name: "shuvo", password: "QWERWRER", email: "BLASHS@GMAIL.COM" };
    var expected = JSON.parse(user);
    userHandler.createUser(db, user.id, user.name, user.password, user.email);
    getUserFromDb(user.id).then(
        (user) => {
            actual = JSON.stringify(user);
        }).catch((err) => {
            console.log('db error = ' + err);
        }
    );
    expect(expected).to.equal(actual);
  })
});

function getUserFromDb(userId) {
    return new Promise((resolve, reject) => {
        console.log('getUserInfo');
        var query = "SELECT * FROM USER "
            + "  WHERE ID = '" + userId + "'";
        var user;
        db.each(query,
            function(err, row) {
                if(err) {
                    throw err;
                }
                user = { id: ID, name: row.NAME, password: row.PASSWORD, email: row.EMAIL };
            },
            function(err) {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(user);
                }
        });
    });
}