
import connection from '../connection.js';

const addSlots = (req,res) =>{
   try{
       let {slot_date,slot_time,address,location} = req.body
       let query = `select id from slots where slot_date = "${slot_date}" and slot_time = "${slot_time}" `;
       connection.query(query,(error,result,fields)=>{
           if (error) throw console.error(error.sqlMessage)
           console.log(result)
           if(!(result.length)){
             
            let query = `insert into slots (slot_date,slot_time,address,location) values("${slot_date}","${slot_time}","${address}","${location}")`
            connection.query(query,(error,result,fields)=>{
                if (error) throw console.error(error.sqlMessage)
                console.log(result)
                res.send("added slot")
            })
           }else{
             res.send("slot already exits")
           }
          
       })
       
   }catch(err){
    console.log(err)
   }
}

const getSlots = (req,res) =>{
    try{
        let query =  `select * from slots;`
        connection.query(query,(error,result,fields)=>{
            if (error) throw console.error(error.sqlMessage)
            if(result.length){
              res.send(result)
            }else{
              res.send("slots are not available")
            }
           
        })
        
    }catch(err){
     console.log(err)
    }
 }

 const updateSlots = (req,res) =>{
    try{
        let {id,slot_date,slot_time,address,location} = req.body
        let query = `update slots set `;
        
        if(slot_date){
            query += `slot_date="${slot_date}" ,`
        }
        if(slot_time){
            query += `slot_time="${slot_time}" ,`
        }
        if(address){
            query += `address="${address}" ,`
        }
        if(location){
            query += `location="${location}" ,`
        }
        
        query = query.slice(0,-1)
        query += `where id= ${id} ;`;
        console.log(query)
       

        connection.query(query,(error,result,fields)=>{
            if (error) throw console.error(error.sqlMessage)
            console.log(result)

            res.send("slot updated")
           
        })
        
    }catch(err){
     console.log(err)
    }
 }

const deleteSlots = (req,res) =>{
    try{
        let {id} = req.body
        let query = `delete from slots where id=${id}`;
        console.log(query)
        connection.query(query,(error,result,fields)=>{
            if (error) throw console.error(error.sqlMessage)
            console.log(result)

            res.send("slot deleted")
           
        })
        
    }catch(err){
     console.log(err)
    }
 }
 
export default {
      addSlots,
      getSlots,
      updateSlots,
      deleteSlots,
}