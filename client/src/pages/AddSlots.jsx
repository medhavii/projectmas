import React, { useState } from 'react'
import axios from 'axios';
import SuccessAlert from '../components/shared/SuccessAlert';
const AddSlots = () => {
  const [formData, setFormData] = useState({
    slot_date: '',
    slot_time: '',
    name: '',
    address: '',
    count: ''
  });
  const [loading,setLoading] = useState(false)
  const [success,setSuccess] = useState(false)
  const addSlots = async () => {
    try {
     const response = await axios.post('http://localhost:3000/v1/api/admin/addSlots', {
        ...formData
      })
      return response.data;
    }
    catch (error) {
    console.error(error);
    return null;
  }
}
   
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    addSlots().then((data)=>{
        if(data.success){
             setSuccess(true)
        }else{
            setSuccess(false)
        }
    })
    console.log({...formData});
    setLoading(false)
    // Add your form submission logic here
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        {success && <SuccessAlert message={"slot added "}/>}       
        <div className="max-w-lg mx-auto space-y-3 sm:text-center">
          <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Add Slots
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col items-center gap-y-5 gap-x-6 [&>*]:w-full sm:flex-row">
              <div>
                <label className="font-medium">
                  Slot Date
                </label>
                <input
                  type="text"
                  name="slot_date"
                  value={formData.slot_date}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium">
                  Slot Time
                </label>
                <input
                  type="text"
                  name="slot_time"
                  value={formData.slot_time}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="font-medium">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">
                Address
              </label>
              <div className="relative mt-2">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full  px-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="font-medium">
                Count
              </label>
              <div className="relative mt-2">
                <input
                  type="text"
                  name="count"
                  value={formData.count}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                  />
                              </div>
                          </div>
                          <button
                              className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                          >
                             { loading ? "Loading" : "submit" }
                          </button>
                      </form>
                  </div>
              </div>
          </main>
      )
  }

export default AddSlots;