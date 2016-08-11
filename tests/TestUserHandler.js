// TestUserHandler - test all the user functions
var sqlite3 = require('sqlite3');

var _ = request("../userhandler.js");
var db = new sqlite3.Database('testslackclone.db');

describe('Test getUserJSON', () => {
  before(function { 
      db.exec("BEGIN");
  });
  after(function {
      db.exec("ROLLBACK");
  });
  it('#1 getUserProfileJSON', () => {
    var userId = 0;
    var user = { id: userID, name: "Paul Frey", password: "superman", email: "paulgfrey@gmail.com" };
    var expected = JSON.parse(user);
    var actual = _.getUserProfileJSON(db, userId);
    actual.must.eql(expected);
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
    var userId = 0;
    var user = { id: userID, name: "Paul", password: "superman", email: "paulgfrey@gmail.com" };
    var expected = JSON.parse(user);
    _.createUser(db, user.id, user.name, user.password, user.email);
    getUserFromDb(user.id).then(
        (user) => {
            actual = JSON.parse(user);
        }).catch((err) => {
            console.log('db error = ' + err);
        }
    );
    actual.must.eql(expected);
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