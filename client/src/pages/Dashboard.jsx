import React, { useState, useEffect } from 'react'
import authContext from '../context/authContext'
import { useContext } from 'react'
import MySlots from '../components/shared/MySlots'
import Loading from '../components/shared/Loading'
import axios from 'axios'
const Dashboard = () => {
  const context = useContext(authContext)

  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState({})
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


useEffect(() => {
  setLoading(true);
  getSlots().then((data)=>{
    setSlots(data);
    setLoading(false);
  });
 
}, [context])
return (

  <>
    <p className='text-4xl'>welcome {context.data.name} buddy</p>


    <div>
      {loading ? <Loading /> : <MySlots slots={slots}/>}

    </div>
  </>

)
}

export default Dashboard