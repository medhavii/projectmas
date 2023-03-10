import connection from "../connection.js";

const  queryExec = async (query) =>{
    await connection.query(query,(error,result,fields)=>{
        if(error){
            throw console.error(error.sqlMessage) 
        }
        console.log(result)
        
        return result
    })
}

export default queryExec;