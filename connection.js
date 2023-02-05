
import mysql from 'mysql'
const config = {
    host    : 'sql12.freesqldatabase.com',
    user    : 'sql12595628',
    password: 'IdwGiG7TnB',
    database: 'sql12595628'
  };

  
  const connection = mysql.createConnection(config)
  

export default connection;