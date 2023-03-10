
import queryExec from '../helpers/queryExecuter.js'

const bookSlots = async(req,res) => {
    try{
        let {user_id,slot_id} = req.body
        //can optimize it by reducing it to a single call
        let query = `select * from bookings where user_id=${user_id} or slot_id=${slot_id};`

        query = `insert into bookings (user_id,slot_id) values(${user_id},${slot_id});`;
        result = await queryExec(query)

        query = `update user set booked=1 where id=${user_id};`
        result = await queryExec(query)
        query = `update slots set available=0 where id=${slot_id};`
        result = await queryExec(query)
        
        res.send("slot is booked successfully")
    }catch(err){
        console.log(err)
    }
}

const cancelBooking = (req,res) =>{

}
export default {
    bookSlots,
    cancelBooking,
}