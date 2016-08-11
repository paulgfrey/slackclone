var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

var filename = 'slackclone.db';
var dbexists = false;
try {
    fs.accessSync(filename);
    dbexists = true;
} catch (ex) {
    dbexists = false;
}

var db = new sqlite3.Database('slackclone.db');


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
                    " NAME      CHAR(25)   NOT NULL ,"  + 
                    " USERID     INTEGER ," +
                    " CHANNELID     INTEGER ," +
                    " TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP ," + 
                      "FOREIGN KEY(USERID) REFERENCES USERS(ID), " +   
                       "FOREIGN KEY(CHANNELID) REFERENCES CHANNEL(ID)) "   ;



        db.run(createTEAMTableSql);
        db.run(createUSERSTableSql);
        db.run(createTEAMUSERSTableSql);
        db.run(createCHANNELTableSql);
        db.run(createMESSAGESTableSql);


        });

        // db.exec("COMMIT");
    }

 

// db.close();

