// TestmessageHandler - test all the user functions
var sqlite3 = require('sqlite3');
var expect = require('expect.js');
var assert = require('assert');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

var messageHandler = require("../messageHandler.js");
var db = new sqlite3.Database('testslackclone.db');

describe('Test messageHandler', () => {
    beforeEach(() => {
        db.exec('BEGIN');
    });
    afterEach(() => {
        db.exec('ROLLBACK');
    });
    it('#1 addChannelMessage', (done) => {
        var msg = { userId: 1, channelId: 1, msg: "This is a test!" };
        var expected = JSON.stringify(msg);
        messageHandler.addChannelMessage(db, msg.channelId, 
                        msg.userId, msg.msg)
        .then(
            (msgId) => {
                return getMsgFromDB(msg.channelId, msg.userId);
        })
        .should.eventually.equal(expected).notify(done);
    });
});

function getMsgFromDB(channelId, 
                        userId) {
    return new Promise((resolve, reject) => {
        var query = "SELECT USERID, CHANNELID, MSG FROM MESSAGES "
            + "  WHERE CHANNELID = ? AND USERID = ?";
        var msg;
        db.each(query, channelId, userId,
            function (err, row) {
                if (err) {
                    throw err;
                }
                msg = { userId: row.USERID, channelId: row.CHANNELID, msg: row.MSG };
            },
            function (err) {
                if (err) {
                    reject(err);
                    throw err;
                }
                else {
                    resolve(JSON.stringify(msg));
                }
            });
    });
}