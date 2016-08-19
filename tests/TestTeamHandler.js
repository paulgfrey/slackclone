// TestUserHandler - test all the user functions
var sqlite3 = require('sqlite3');
var expect = require('expect.js');
var assert = require('assert');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

var teamHandler = require("../teamHandler.js");
var ChannelHandler = require("../teamHandler.js");
var db = new sqlite3.Database('testslackclone.db');

describe('Test teamHandler', () => {
    beforeEach(() => {
        db.exec('BEGIN');
    });
    afterEach(() => {
        db.exec('ROLLBACK');
    });

    it('#1 getTeamByUser', (done) => {
        var userId = 1;
        var teams = [{  id: 1, name: "team1" } ];
        var expected = JSON.stringify(teams);
        teamHandler.getTeamByUserIDJSON(db, userId)
            .should.eventually.equal(expected).notify(done);
   });


    it('#2 getChannelsByTeamAndUser', (done) => {
        var userId = 1;
        var teamid = 1;
        var channels = [{  id: 1, name:"shuvo", teamId: 1, description: "description for shuvo",type:"Private" } ];
        var expected = JSON.stringify(channels);
        ChannelHandler.getChannelsByTeamAndUser(db, userId,teamid)
            .should.eventually.equal(expected).notify(done);
   });
});

