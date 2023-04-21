import React, { useState, useEffect } from 'react'
import authContext from '../context/authContext'
import { useContext } from 'react'
import MySlots from '../components/shared/MySlots'
import Loading from '../components/shared/Loading'
import SuccessAlert from '../components/shared/SuccessAlert'
import axios from 'axios'
const Dashboard = () => {
  const context = useContext(authContext)
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([])
  const [success,setSuccess] = useState(false)
  const getSlots = async () => {
    try {
      const response = await axios.post('http://localhost:3000/v1/api/user/getBookingsByNumber', {
        number: context.data.contact,
      })
      return response.data;
    }
    catch (error) {
      console.error(error);
      return null;
    }

  }
  
  const cancelSlot = async (slot_id) => {
    try {
      const response = await axios.post('http://localhost:3000/v1/api/user/cancelSlot', {
        "number": context.data.contact,
        "slot_id": slot_id,
      })
      return response.data; 
    }
    catch (error) {
      console.error(error);
      return null;
    }
  }

  const CancelHandle = (slot_id) =>{
    console.log(slot_id)
    setLoading(true)
    cancelSlot(slot_id).then((data)=>{
          console.log('hello')
         if(data.success){
            setSuccess(true)
            setLoading(false)
         }
    })
  }

    useEffect(() => {
      setLoading(true);
      getSlots().then((data) => {
        setBookings(data);
        setLoading(false);
      });
    }, [context,success])


    return (

      <>
        <p className='text-4xl'>welcome {context.data.name} buddy</p>
        
        {success && <SuccessAlert message={"slot deleted"}/>}  
        <div className='mt-28'>
          {loading ? <Loading /> : <MySlots bookings={bookings} CancelHandle={CancelHandle}/>}

        </div>
      </>

    )
  }
export default Dashboard;