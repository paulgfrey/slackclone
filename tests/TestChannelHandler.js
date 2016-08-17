// TestUserHandler - test all the user functions
var sqlite3 = require('sqlite3');
var expect = require('expect.js');
var assert = require('assert');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

var channelHandler = require("../channelHandler.js");
var db = new sqlite3.Database('testslackclone.db');

describe('Test channelHandler', () => {
    beforeEach(() => {
        db.exec('BEGIN');
    });
    afterEach(() => {
        db.exec('ROLLBACK');
    });
    it('#1 getChannelMessageJSON', (done) => {
        var searchChannelID = 1;
        var jsObject = [
            { id: 1, userID: 1, channelID: searchChannelID, 
            timeStamp: "2016-08-17 14:37:29",message:"Message 1: We Made Marks Day" },
            { id: 3, userID: 2, channelID: searchChannelID, 
            timeStamp: "2016-08-17 14:37:29",message:"Message 3: User 2, Channel 1" }
        ];
        var expected = JSON.stringify(jsObject);
        channelHandler.getChannelMessageJSON(db, searchChannelID).should.eventually.equal(expected).notify(done);
    });

});

/*
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
*/