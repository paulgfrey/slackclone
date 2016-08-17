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
        //Creating Tables
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

        var insertTEAMTableSql = "INSERT INTO TEAM ( NAME) " +
            "VALUES ('team1')," +
                   "('team2')," +
                   "('team3')" ;

        var insertUSERSTableSql = "INSERT INTO USERS (NAME, PASSWORD, EMAIL) " +
           "VALUES ('shuvo', 'QWEWRER', 'BLASHS@GMAIL.COM')," +
                   "('GREG', 'QWEWRER',  'RTERE@GMAIL.COM')," +
                   "('PAUL', 'QWEWRER', 'BRRTTS@GMAIL.COM')," +
                   "( 'JASON', 'QWEWRER', 'BRTRRTS@GMAIL.COM')" ;


/*
       var insertChannelTableSql = "INSERT INTO CHANNEL (NAME, PASSWORD, EMAIL) " +
           "VALUES ('shuvo', 'QWEWRER', 'BLASHS@GMAIL.COM')," +
                   "('GREG', 'QWEWRER',  'RTERE@GMAIL.COM')," +
                   "('PAUL', 'QWEWRER', 'BRRTTS@GMAIL.COM')," +
                   "( 'JASON', 'QWEWRER', 'BRTRRTS@GMAIL.COM')" ;
  */       
      
        db.run(insertTEAMTableSql);
        db.run(insertUSERSTableSql);

     //   db.run(insertTEAMUSERSTableSql);

   
    });

}
     
// db.close();

