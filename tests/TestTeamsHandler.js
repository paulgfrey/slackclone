// TestUserHandler - test all the user functions
var sqlite3 = require('sqlite3');
var expect = require('expect.js');
var assert = require('assert');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

var teamHandler = require("../teamHandler.js");
var db = new sqlite3.Database('../slackclone.db');

describe('Test teamHandler', () => {
    beforeEach(() => {
        db.exec('BEGIN');
    });
    afterEach(() => {
        db.exec('ROLLBACK');
    });


   //Test that multiple teams are returned
   it('#1 Get Multiple Teams tests', (done) => {
        var userId = 1;
        var teams = [{  id: 1, name: "team1" },{id:3,name:"team3"} ];
        var expected = JSON.stringify(teams);
        teamHandler.getTeamByUserIDJSON(db, userId)
            .should.eventually.equal(expected).notify(done);
   });

});

