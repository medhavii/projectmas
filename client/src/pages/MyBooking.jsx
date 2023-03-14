import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     // Fetch bookings data from the server
//     fetch('http://localhost:3000/v1/api/user/bookings')
//       .then((response) => response.json())
//       .then((data) => setBookings(data))
//       .catch((error) => console.error(error));
//   }, []);
 const data = [
    {
        "id" : "1",
        "name" : "sdfb",
        "location" : "chennai",
        "address" : "KattankulathurTamil Nadu 603203",
        "time" : "12:30",
        "date" : "2023-03-14"
    }
 ]

  return (
    <div className="pt-24 pb-24 py-6 px-4 sm:px-6 lg:px-8 h-[100vh] ">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl leading-9 font-extrabold text-blue-600">
          My Bookings
        </h2>
        <div className="mt-8 ">
          {data.length > 0 ? (
            <table className="w-full text-left border-collapse bg-blue-200">
              <thead>
                <tr>
                  <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">
                    Date
                  </th>
                  <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">
                    Time
                  </th>
                  <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">
                    Location
                  </th>
                  <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300">
                    Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((booking) => (
                  <tr key={booking.id}>
                    <td className="py-4 px-6 border-b border-gray-300">
                      {new Date(booking.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-300">
                      {booking.time}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-300">
                      {booking.location}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-300">
                      {booking.address}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">
              You have no bookings at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
