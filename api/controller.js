
import connection from '../connection.js';
const register = (req,res) => {
    try{
        const {name,mobile,email,password,DOB,gender,isBooked,bookings} = req.body
       let query = `insert into user (name,mobile,email,password,DOB,gender,isBooked,bookings) values ("${name}","${mobile}","${email}","${password}","${DOB}",'${gender}',${isBooked},"${bookings}");`
        connection.query(query,(error,result) => {
            if (error){
             throw console.error(error)
            }
            console.log(result)
          });
        
        res.send("user registered")
    }catch(err){
        console.log(err)
    }

}

const login = (req,res) =>{
    try{
        const {mobile,password} = req.body
        let query = `select * from user where mobile = "${mobile}"`
        connection.query(query,(error,result,fields)=>{
            // console.log(JSON.stringify(result[0].bookings))
            if(error){
                throw console.error(error.sqlMessage)
            }
            if(result.length){
               result[0].password == password ? res.send("welcome"+result[0].name) : res.send("wrong password")
            }else{
                res.send("user doesnt exist")
            }
        })
    }catch(err){
        console.log(err+"hello")
    }
    
}

const centerLogin = (req,res) =>{

    try{
        const {email,password} = req.body
        let query = `select * from center where email = "${email}"`
        connection.query(query,(error,result,fields)=>{
            
            if(error){
                throw console.error(error.sqlMessage)
            }
            if(result.length){
               result[0].password == password ? res.send("welcome "+result[0].name) : res.send("wrong password")
            }else{
                res.send("center doesnt exist")
            }
        })
    }catch(err){
        console.log(err+ "hello")
    }
}

const centerRegister = (req,res) =>{
    try{
        const {name,address,mobile,email,password,isFree,slots} = req.body
       let query = `insert into center (name,address,mobile,email,password,isFree,slots) values ("${name}","${address}","${mobile}","${email}","${password}",${isFree},"${slots}");`
        connection.query(query,(error,result) => {
            if (error){
             throw console.error(error)
            }
            console.log(result)
          });
        
        res.send("center registered")
    }catch(err){
        console.log(err)
    }
}

const updateSlots = (req,res) =>{
   try{
       let {email,slots,action} = req.body
       console.log(typeof(slots))
       let query = `select * from center where email = "${email}" `
       connection.query(query,(error,result,fields)=>{
           if (error) throw console.error(error.sqlMessage)
           console.log(result)
           if(result.length){
             if(action == 'a'){
                slots = result[0].slots + slots
             }else{
                let temp = result[0].slots
                temp = temp.replace(slots," ")
                temp = temp.replace(", ","")
                slots = temp;
             }
            let query = `update  center set slots = "${slots}" where email = "${email}"`
            connection.query(query,(error,result,fields)=>{
                if (error) throw console.error(error.sqlMessage)
                console.log(result)
                res.send("added slots")
            })
           }else{
             res.send("error")
           }
          
       })
       
   }catch(err){
    console.log(err)
   }
}
const bookSlots = (req,res) => {
    try{
        let {mobile,id,booking,} = req.body
        let query = `select slots from customer where id= "${id}"`
        connection.query(query,(error,result,fields)=>{
            if(error){
                throw console.error(error.sqlMessage) 
            }
            console.log(result)
            if(result.length){
                let query = `update user set bookings = "${booking}" isBooked = true where mobile = "${mobile}"`
                connection.query(query,(error,result,fields)=>{
               if(error){
                 throw console.error(error.sqlMessage) 
               }
              console.log(result)
              res.send("slot is booked")
               })
            }else{
                res.send("error")
            }
            
        })
    }catch(err){
        console.log(err)
    }
}



export default {
      register,
      login,
      centerLogin,
      centerRegister,
      updateSlots,
}