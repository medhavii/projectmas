import React,{useEffect,useState} from 'react'
import axios from 'axios'
import AllSlots from '../components/shared/AllSlots'
import SuccessAlert from '../components/shared/SuccessAlert'
import { useContext } from 'react'
import authContext from '../context/authContext'
import Loading from '../components/shared/Loading'
const BookSlot = () => {
    const context = useContext(authContext)
    
     const [slots,setSlots] = useState([])
     const [success,setSuccess] = useState(false)
     const [loading,setLoading] = useState(false)
     const BookSlotHandle = (id) =>{
         setLoading(true)
         bookSlot(id,context.data.contact).then((data)=>{
               if(data.success){
                   setSuccess(true)
                   setLoading(false)
               }
         })
     }

    const bookSlot = async (id,number) => {
        try {
            const response = await axios.post('http://localhost:3000/v1/api/user/bookSlot',{
                 "slot_id" : id,
                 "number" : number
            })
             return response.data;
           }
           catch (error) {
           console.error(error);
           return null;
         }
       }
    
    const getAllSlots = async () => {
        try {
         const response = await axios.get('http://localhost:3000/v1/api/user/getSlots')
          return response.data;
        }
        catch (error) {
        console.error(error);
        return null;
      }
    }
  useEffect(()=>{
      getAllSlots().then((data)=>{
           setSlots(data)
      })
  })
  return (
      <div>
           {success && <SuccessAlert message={"slot is booked"}/>}
          {loading ? <Loading/> : <AllSlots  slots={slots} BookSlotHandle={BookSlotHandle}/> }
      </div>
  )

}

export default BookSlot