import React from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect } from 'react';
import { useState } from 'react';
const Booking2 = () => {
    // useEffect(() => {
    //     fetch('http://localhost:3000/v1/api/user/getSlots')
    //       .then(response => response.json())
    //       .then(data => setSlotData(data))
    //       .catch(error => console.error(error));
    //   }, []);

const data = [
    {
        "id" : "1",
        "slot_time" : "10:00" 
    },
    {
        "id" : "2",
        "slot_time" : "11:00" 
    },
    {
        "id" : "3",
        "slot_time" : "12:00" 
    },
    {
        "id" : "4",
        "slot_time" : "13:00" 
    }
]
   
    const[slotData,setSlotData] = useState(null);
    const[selectedDate,setSelectedDate] = useState(null);
    const[selectedTime,setSelectedTime] = useState(null);
    
    
    const handleDateChange = (date) => {
        setSlotData(data)
        setSelectedDate(date);
        setSelectedTime(null);     
      };

      const handleTimeSlotSelection = (timeSlot) => {
        setSelectedTime(timeSlot);
      };
    
  return (
    // <div>{slotData && slotData.map((data) =>(
    //         <div>
    //             <p>{data.id}</p>
    //             <p>{data.slot_date}</p>
    //             <p>{data.slot_time}</p>
    //         </div>
    // ))}</div>
    <div className=" pt-24 pb-24 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl leading-9 font-extrabold text-blue-600">
          Available Slots
        </h2>
        <div className="mt-8">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
          <div className="">
            <div >
              <label htmlFor="date" className="block text-lg font-medium text-blue-600">
                pick a date
              </label>
              <DatePicker
                id="date"
                selected={selectedDate}
                onChange={handleDateChange}
                className=" mt-2 border-rounded border-2 border-blue-100"
              />
            </div>
            <div className='mt-10'>
              <label htmlFor="time" className="block text-lg font-medium text-blue-600">
                Select a time slot
              </label>
              <div className="mt-4 flex flex-wrap text-blue-600">
                {
                  slotData && slotData.map((timeSlot) => (
                     <button
                      key={timeSlot.id}
                      onClick={() => handleTimeSlotSelection(timeSlot)}
                      className={`${
                        selectedTime && selectedTime.id === timeSlot.id
                          ? 'bg-blue-600 text-white'
                          : ' bg-white text-blue-600'
                      } rounded-lg px-4 py-2 mt-2 mr-2 text-lg font-medium focus:outline-none focus:shadow-outline-blue active:bg-blue-200 transition duration-150 ease-in-out`}
                    >
                    { 
                     timeSlot.slot_time
                    }
                    </button> 
                  ))}
              </div>
            </div>
          </div>
          <div className="mt-8">
            {selectedDate && selectedTime && (
              <div className=" rounded-lg px-4 py-4 sm:px-6 bg-blue-200">
                <p className="text-lg font-medium text-blue-600">
                  You have selected the following slot:
                </p>
                <p className="mt-2 text-gray-600 ">
                  {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day:'numeric',
                })}{' '}
                at {selectedTime.slot_time}
              </p>
                <button className='bg-blue-400 m-2 p-2 px-4 rounded'>confirm</button>
                <button className='bg-red-400 m-2 p-2 px-4 rounded'>cancel</button>
            </div>
          )}
        </div>
        </div>
</div>
</div>

  )
}

export default Booking2