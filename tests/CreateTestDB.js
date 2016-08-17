var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

var filename = 'testslackclone.db';
var dbexists = false;
try {
    fs.accessSync(filename);
    dbexists = true;
} catch (ex) {
    dbexists = false;
}

var db = new sqlite3.Database('testslackclone.db');


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
<<<<<<< Updated upstream

=======
        // Pauls comment to force collision
>>>>>>> Stashed changes
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

       var insertTEAMTableSql = "INSERT INTO TEAM ( NAME) " +
            "VALUES ('team1')," +
                   "('team2')," +
                   "('team3')" ;

        var insertUSERSTableSql = "INSERT INTO USERS (NAME, PASSWORD, EMAIL) " +
           "VALUES ('shuvo', 'QWEWRER', 'BLASHS@GMAIL.COM')," +
                   "('GREG', 'QWEWRER',  'RTERE@GMAIL.COM')," +
                   "('PAUL', 'QWEWRER', 'BRRTTS@GMAIL.COM')," +
                   "( 'JASON', 'QWEWRER', 'BRTRRTS@GMAIL.COM')" ;

        var insertChannelTableSql = "INSERT INTO CHANNEL (NAME, TEAMID, DESCRIPTION,TYPE) " +
           "VALUES ('Channel-1: Apples', 1, 'Channel 1 is about apples','Public')," +
                   "('Channel-2: Bears', 1, 'Channel 2 is about bears','Public')," +
                   "('Channel-3: Chairs',2, 'Channel 3 is about chairs','Public')," +
                   "('Channel-4: Doors',2, 'Channel 3 is about doors','Public')" ;

        var insertMessageTableSql = "INSERT INTO MESSAGES (USERID, CHANNELID,MSG) " +
           "VALUES (1, 1, 'Message 1: We Made Marks Day')," +
                   "(1,2, 'Message 2: We are good to go')," +
                   "(2,1, 'Message 3: User 2, Channel 1')," +
                   "(2,2, 'Message 4: User 2, Channel 2')" ;

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

        db.run(insertMessageTableSql, function(err) {
            if(err) {
                throw(err);
            }
            else {
                console.log('Inserting into Message Table');
            };
        });
        
        var insertTEAMUSERSTableSql = "INSERT INTO TEAMUSERS (ID, USERID, TEAMID) " +
           "VALUES ('1', '1', '1')," +
                   "('2', '2',  '2')," +
                   "('3', '4', '2')";

         db.run(insertTEAMUSERSTableSql);

   
    });

}
        
db.close();

