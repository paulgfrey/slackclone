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
                       "(ID             INTEGER PRIMARY KEY AUTOINCREMENT   NOT NULL," +
                       " NAME           CHAR(50)    UNIQUE CONSTRAINT     NOT NULL)"; 


        var createUSERSTableSql = "CREATE TABLE IF NOT EXISTS USERS " +
                    "( ID         INTEGER PRIMARY KEY AUTOINCREMENT  NOT NULL," +
                    " NAME         CHAR(140)   NOT NULL, " + 
                    " PASSWORD     CHAR(25)    NOT NULL," +
                    " EMAIL         CHAR(50)    NOT NULL)"; 


        var createTEAMUSERSTableSql = "CREATE TABLE IF NOT EXISTS TEAMUSERS " +
                    "( ID         INTEGER PRIMARY KEY AUTOINCREMENT    NOT NULL," +
                    " FOREIGN KEY(USERID) REFERENCES USERS(ID), " + 
                    " FOREIGN KEY(TEAMID) REFERENCES TEAM(ID) " ;


        var createCHANNELTableSql = "CREATE TABLE IF NOT EXISTS CHANNEL " +
                    "(ID        INTEGER PRIMARY KEY AUTOINCREMENT   NOT NULL," +
                    " NAME      CHAR(25)   NOT NULL  ,"  +
                    " FOREIGN KEY(TEAMID) REFERENCES TEAM(ID) ,"  +
                    " DESCRIPTION  CHAR(50) , "   +
                    " TYPE      CHAR(10)   NOT NULL ) " ;
                    

       var createMESSAGESTableSql = "CREATE TABLE IF NOT EXISTS MESSAGES " +
                    "(ID        INTEGER PRIMARY KEY AUTOINCREMENT   NOT NULL ," +
                    " NAME      CHAR(25)   NOT NULL ,"  +
                    "FOREIGN KEY(USERID) REFERENCES USERS(ID), " +  
                    "FOREIGN KEY(CHANNELID) REFERENCES CHANNEL(ID), " +  
                    "TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP )" ; 



        db.run(createTEAMTableSql);
        db.run(createUSERSTableSql);
        db.run(createTEAMUSERSTableSql);
        db.run(createCHANNELTableSql);
        db.run(createMESSAGESTableSql);

        });
    }

 

// db.close();

