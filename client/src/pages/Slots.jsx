import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Slots = () => {
  const [slots, setSlots] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    slot_time: '',
    location : '',
    address : '',
  });

  const { id, slot_time,date,address,location } = formData;

  const data = [
      {
        "id" : "1",
         "slot_time" : "12:00",
         "location" : "chennai",
         "address" : "Dunder Mifflin 1725 Slough Avenue, Suite 200 ,Scranton,Pennsylvania"
      }
  ]

  useEffect(() => {
    fetchSlots();
    setFormData(data)
  }, []);

  const fetchSlots = async () => {
    const res = await axios.get('/api/slots');
    setSlots(res.data);
  }

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!id || !slot_time) {
      return alert('Please enter all fields');
    }

    try {
      const res = await axios.post('/api/slots', formData);
      setSlots([...slots, res.data]);
      setFormData({ id: '', slot_time: '' });
      alert('Slot created successfully');
    } catch (err) {
      console.error(err);
      alert('Error creating slot');
    }
  }

  const onDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this slot?')) {
      return;
    }

    try {
      await axios.delete(`/api/slots/${id}`);
      setSlots(slots.filter(slot => slot.id !== id));
      alert('Slot deleted successfully');
    } catch (err) {
      console.error(err);
      alert('Error deleting slot');
    }
  }

  const onUpdate = async (id) => {
    const newTime = prompt('Enter new time:');
    if (!newTime) {
      return;
    }

    try {
      const res = await axios.put(`/api/slots/${id}`, { slot_time: newTime });
      setSlots(slots.map(slot => slot.id === id ? res.data : slot));
      alert('Slot updated successfully');
    } catch (err) {
      console.error(err);
      alert('Error updating slot');
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-[720px]">
      <h2 className="text-2xl font-bold mb-8">Manage Slots</h2>
      <form onSubmit={onSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <label htmlFor="slot_date" className="text-lg font-medium pr-12">Date:</label>
          <input type="text" name="date" id="date" value={date} onChange={onChange} className="rounded-lg border-gray-500 p-2 w-full border-2 " />
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <label htmlFor="slot_time" className="text-lg font-medium pr-12">Time:</label>
          <input type="text" name="slot_time" id="slot_time" value={slot_time} onChange={onChange} className="rounded-lg border-gray-300 p-2 w-full border-2" />
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <label htmlFor="address" className="text-lg font-medium pr-5">Address:</label>
          <input type="text" name="address" id="address" value={address} onChange={onChange} className="rounded-lg border-gray-300 p-2 w-full border-2" />
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <label htmlFor="location" className="text-lg font-medium pr-5">Location:</label>
          <input type="text" name="location" id="location" value={location} onChange={onChange} className="rounded-lg border-gray-300 p-2 w-full border-2" />
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-700">Add Slot</button>
      </form>
      <table className="mt-8 w-full">
        <thead>
          <tr>
            <th className="text-lg font-medium text-gray-700">ID</th>
            <th className="text-lg font-medium text-gray-700">Time</th>
            <th className="text-lg font-medium text-gray-700">Address</th>
            <th className="text-lg font-medium text-gray-700">Location</th>
<th className="text-lg font-medium text-gray-700">Actions</th>
</tr>
</thead>
<tbody>
{data.map(slot => (
<tr key={slot.id}>
<td className="border px-4 py-2">{slot.id}</td>
<td className="border px-4 py-2">{slot.slot_time}</td>
<td className="border px-4 py-2">{slot.address}</td>
<td className="border px-4 py-2">{slot.location}</td>
<td className="border px-4 py-2">
<div className='flex'>
<button onClick={() => onDelete(slot.id)} className="bg-red-500 text-white rounded-lg py-2 px-4 hover:bg-red-700">Delete</button>
<button onClick={() => onUpdate(slot.id)} className="bg-green-500 text-white rounded-lg py-2 px-4 hover:bg-green-700 ml-2">Update</button>
</div>

</td>
</tr>
))}
</tbody>
</table>
</div>
);
};

export default Slots;

