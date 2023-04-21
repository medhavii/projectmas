import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const MySlots = ({bookings,CancelHandle}) => {
  const navigate = useNavigate()
  const clickHandler = () => {
       navigate("/bookslots")
  }
  return (
    
    <div className="max-w-2xl mx-auto px-4">
        <div className="items-start justify-between sm:flex">
            <div>
                <h4 className="text-gray-800 text-xl font-semibold">My Bookings</h4>
            </div>
            <button onClick={clickHandler} className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg sm:mt-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
                Book a slot
            </button>
        </div>
        <ul className="mt-12 divide-y">
  {bookings ? (
    bookings.map((item, idx) => (
      <li
        key={idx}
        className="py-5 flex items-start justify-between border-b border-gray-200"
      >
        <div className="flex gap-3">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {item.slot.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {item.slot.address}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Date: {item.slot.slot_date}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Time: {item.slot.slot_time}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Booked on: {item.created_at}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={()=>CancelHandle(item.slot.id)}
            className="text-gray-700 text-sm border  bg-red-200 hover:bg-red-600 hover:text-white rounded-lg px-3 py-2 duration-150 "
          >
           cancel slot
          </button>
        </div>
      </li>
    ))
  ) : (
    <li className="py-5 text-gray-500">
      Bookings are not found
    </li>
  )}
</ul>

    </div>
  )
}

export default MySlots


