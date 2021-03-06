// TestUserHandler - test all the user functions
var sqlite3 = require('sqlite3');
var expect = require('expect.js');
var assert = require('assert');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

var userHandler = require("../userhandler.js");
var db = new sqlite3.Database('testslackclone.db');

describe('Test userHandler', () => {
    beforeEach(() => {
        db.exec('BEGIN');
    });
    afterEach(() => {
        db.exec('ROLLBACK');
    });
    it('#1 getUserProfileJSON', (done) => {
        var userId = 1;
        var user = { id: userId, name: "shuvo", password: "QWEWRER", email: "BLASHS@GMAIL.COM" };
        var expected = JSON.stringify(user);
        userHandler.getUserProfileJSON(db, userId).should.eventually.equal(expected).notify(done);
    });

    it('#2 createUserProfile', (done) => {
        var user = { name: "Paul Frey", password: "superman", email: "paulgfrey@gmail.com" };
        var expected = JSON.stringify(user);
        userHandler.createUserProfile(db, user.name, user.password, user.email)
            .then(
            (userId) => {
                return getUserFromDb(userId);
            })
            .should.eventually.equal(expected).notify(done);
    });
});

function getUserFromDb(userId) {
    return new Promise((resolve, reject) => {
        var query = "SELECT NAME, PASSWORD, EMAIL FROM USERS "
            + "  WHERE ID = '" + userId + "'";
        var user;
        db.each(query,
            function (err, row) {
                if (err) {
                    throw err;
                }
                user = { name: row.NAME, password: row.PASSWORD, email: row.EMAIL };
            },
            function (err) {
                if (err) {
                    reject(err);
                    throw err;
                }
                else {
                    resolve(JSON.stringify(user));
                }
            });
    });


}