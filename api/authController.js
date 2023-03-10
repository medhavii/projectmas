import connection from '../connection.js';
const register = (req,res) => {
    try{
        const {name,contact,email,password,dob,gender,booked} = req.body
       let query = `insert into user (name,contact,mail,password,dob,gender,booked) values ("${name}","${contact}","${email}","${password}","${dob}",'${gender}',${booked});`
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

const login = async (req,res) =>{
    try{
        const {contact,password} = req.body
        let query = `select * from user where contact = "${contact}"`
       await connection.query(query,(error,result,fields)=>{
            if(error){
                throw console.error(error.sqlMessage)
            }
            console.log(result)
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




export default {
    register,
    login,
}