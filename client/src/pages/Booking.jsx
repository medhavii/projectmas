import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect } from 'react';

const Booking = () => {

  useEffect(() => {
    fetch('http://localhost:3000/v1/api/user/getSlots')
      .then(response => response.json())
      .then(data => setSlotData(data))
      .catch(error => console.error(error));
  }, []);

  const [slotData,setSlotData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [filteredSlots,setFilteredSlots] = useState(null);
  
  const convertDate = (selectedDate) =>{
     let date = `"${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${selectedDate.getDate()}"`;
     return date
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
    // setSelectedTimeSlot(null); // Reset selected time slot when the date changes
    const filteredSlots = slotData.filter(slot => {
      const slotDate = convertDate(selectedDate);
      return (
           slot.slot_date === slotDate
      );
    });
    setFilteredSlots(filteredSlots);
  
  };

  const handleTimeSlotSelection = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  return (
    <div className="bg-blue-600 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl leading-9 font-extrabold text-white">
          Available Slots
        </h2>
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-lg font-medium text-white">
                Select a date
              </label>
              <DatePicker
                id="date"
                selected={selectedDate}
                onChange={handleDateChange}
                className="w-full mt-2"
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-lg font-medium text-white">
                Select a time slot
              </label>
              <div className="mt-2 flex flex-wrap">
                {
                selectedDate &&
                  filteredSlots.map((timeSlot) => (
                     <button
                      key={timeSlot.id}
                      onClick={() => handleTimeSlotSelection(timeSlot)}
                      className={`${
                        selectedTimeSlot && selectedTimeSlot.id === timeSlot.id
                          ? 'bg-white text-blue-600'
                          : 'bg-blue-300 text-white'
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
            {selectedDate && selectedTimeSlot && (
              <div className="bg-white rounded-lg px-4 py-4 sm:px-6">
                <p className="text-lg font-medium">
                  You have selected the following slot:
                </p>
                <p className="mt-2 text-gray-600">
                  {selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day:'numeric',
                })}{' '}
                at {selectedTimeSlot.time}
              </p>
                <button className='bg-blue-400 m-2 p-2 px-4 rounded'>confirm</button>
                <button className='bg-red-400 m-2 p-2 px-4 rounded'>cancel</button>
            </div>
          )}
        </div>
        </div>
</div>
</div>

);
};

export default Booking;

