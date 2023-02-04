import express from 'express'
import mysql from 'mysql'
import config from './config.js'

const app = express();
const connection = mysql.createConnection(config)
connection.connect((e)=> {
    if(e) throw console.error(e);
    console.log("Connected!");
  });



app.listen(3001,()=>{
   console.log("app is running")
})




