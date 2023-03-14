import express, { json } from 'express'
import cors from 'cors'
import connection from './connection.js'
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

const app =   express();
connection.connect((e)=> {
  if(e) throw console.error(e);
  console.log("Connected!");
}); 
app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.send('hello')
})
app.use('/v1/api/user',userRoutes)
app.use('/v1/api/admin',adminRoutes)




app.listen(3000,()=>{
   console.log("app is running")
})




