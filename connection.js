
import mysql from 'mysql'
const config = {
    host    : 'slotbookingdb.coqpgejmz25x.us-east-1.rds.amazonaws.com',
    user    : 'admin',
    password: 'QaVtxl8BY9KXjtoA2tFS',
    database: 'slotbooking'
  };

  
  const connection = mysql.createConnection(config)
  

export default connection;