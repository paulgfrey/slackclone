var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

exports.createDB = createDB;
function createDB() {
    var filename = 'slackclone.db';
    var dbexists = false;
    try {
        fs.accessSync(filename);
        dbexists = true;
    } catch (ex) {
        dbexists = false;
    }
    var db = new sqlite3.Database(filename);

	console.log("Creating slackclone.db if not existant");
	
    if (!dbexists) {
        db.serialize(function() {
            var createTEAMTableSql = "CREATE TABLE IF NOT EXISTS TEAM " +
                        "(ID             INTEGER PRIMARY KEY AUTOINCREMENT," +
                        " NAME           CHAR(50)    NOT NULL UNIQUE )"; 


            var createUSERSTableSql = "CREATE TABLE IF NOT EXISTS USERS " +
                        "( ID         INTEGER PRIMARY KEY AUTOINCREMENT  NOT NULL," +
                        " NAME         CHAR(140)   NOT NULL, " + 
                        " PASSWORD     CHAR(25)    NOT NULL," +
                        " EMAIL         CHAR(50)    NOT NULL)"; 


            var createTEAMUSERSTableSql = "CREATE TABLE IF NOT EXISTS TEAMUSERS " +
                        "( ID         INTEGER PRIMARY KEY AUTOINCREMENT    NOT NULL," +
                        " USERID     INTEGER ," +
                        " TEAMID      INTEGER ," +
                        " FOREIGN KEY(USERID) REFERENCES USERS(ID), " + 
                        " FOREIGN KEY(TEAMID) REFERENCES TEAM(ID) ) " ;


            var createCHANNELTableSql = "CREATE TABLE IF NOT EXISTS CHANNEL " +
                        "(ID        INTEGER PRIMARY KEY AUTOINCREMENT   NOT NULL," +
                        " NAME      CHAR(25)   NOT NULL  ,"  + 
                        "TEAMID  INTEGER ," +
                        " DESCRIPTION  CHAR(50) , "   +
                        " TYPE      CHAR(10)   NOT NULL , " +
                        " FOREIGN KEY(TEAMID) REFERENCES TEAM(ID) )"  ;
                        
        var createMESSAGESTableSql = "CREATE TABLE IF NOT EXISTS MESSAGES " +
                        "(ID        INTEGER PRIMARY KEY AUTOINCREMENT   NOT NULL ," +
                        " USERID     INTEGER ," +
                        " CHANNELID     INTEGER ," +
                        " TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP ," + 
                        " MSG       CHAR(4096) NOT NULL, " +
                        "FOREIGN KEY(USERID) REFERENCES USERS(ID), " +   
                        "FOREIGN KEY(CHANNELID) REFERENCES CHANNEL(ID)) "   ;

            db.run(createTEAMTableSql, function(err) {
                if(err) {
                    throw(err);
                }
                else {
                    console.log('created Team table.');
                }
            });

            db.run(createUSERSTableSql, function(err) {
                if(err) {
                    throw(err);
                }
                else {
                    console.log('created User table');
                }
            });
            db.run(createTEAMUSERSTableSql, function(err) {
                if(err) {
                    throw(err);
                }
                else {
                    console.log('created TeamUser table.');
                }
            });
            db.run(createCHANNELTableSql, function(err) {
                if(err) {
                    throw(err);
                }
                else {
                    console.log('created Channel table.');
                }
            });
            db.run(createMESSAGESTableSql, function(err) {
                if(err) {
                    throw(err);
                }
                else {
                    console.log('created Messages table.');
                }
            });

        var insertTEAMTableSql = "INSERT INTO TEAM (ID,  NAME) " +
                "VALUES (1, 'Team1')," +
                    "(2, 'Team2')," +
                    "(3, 'Team3')" ;

            var insertUSERSTableSql = "INSERT INTO USERS (ID, NAME, PASSWORD, EMAIL) " +
            "VALUES (1, 'shuvo', 'shuvo', 'BLASHS@GMAIL.COM')," +
                    "(2, 'greg', 'greg',  'RTERE@GMAIL.COM')," +
                    "(3, 'paul', 'paul', 'BRRTTS@GMAIL.COM')," +
                    "(4, 'jason', 'jason', 'BRTRRTS@GMAIL.COM')" ;

            var insertChannelTableSql = "INSERT INTO CHANNEL (ID, NAME, TEAMID, DESCRIPTION,TYPE) " +
            "VALUES (1, 'Channel-1: Apples', 1, 'Channel 1 is about apples','Public')," +
                    "(2, 'Channel-2: Bears', 1, 'Channel 2 is about bears','Public')," +
                    "(3, 'Channel-3: Chairs',2, 'Channel 3 is about chairs','Public')," +
                    "(4, 'Channel-4: Doors',3, 'Channel 3 is about doors','Public')" ;
                    
            db.run(insertTEAMTableSql, function(err) {
                if(err) {
                    throw(err);
                }
                else {
                    console.log('Inserting into Team Table');
                };
            });

            db.run(insertUSERSTableSql, function(err) {
                if(err) {
                    throw(err);
                }
                else {
                    console.log('Inserting into User Table');
                };
            });
    
            db.run(insertChannelTableSql, function(err) {
                if(err) {
                    throw(err);
                }
                else {
                    console.log('Inserting into Channel Table');
                };
            });
            
            var insertTEAMUSERSTableSql = "INSERT INTO TEAMUSERS (ID, USERID, TEAMID) " +
            "VALUES (1, 1, 1)," +
                    "(2, 2,  2)," +
                    "(3, 3, 3)," +
                    "(4, 4, 1)";

            db.run(insertTEAMUSERSTableSql);

    
        });

    }
            
    db.close();    
}