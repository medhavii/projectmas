import React from 'react'

const AllSlots = ({slots,BookSlotHandle}) => {
    
  return (
    
    <div className="max-w-2xl mx-auto px-4">
        
        <ul className="mt-12 divide-y">
  {slots ? (
    slots.map((item, idx) => (
      <li
        key={idx}
        className="py-5 flex items-start justify-between border-b border-gray-200"
      >
        <div className="flex gap-3">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {item.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {item.address}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Date: {item.slot_date}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Time: {item.slot_time}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Slots Remaining: {item.count}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={()=> BookSlotHandle(item.id)}
            className=" text-sm border bg-green-200 hover:text-white text-black rounded-lg px-3 py-2 duration-150  hover:bg-green-700"
          >
            Book
          </button>
        </div>
      </li>
    ))
  ) : (
    <li className="py-5 text-gray-500">
      slots are not found
    </li>
  )}
</ul>

    </div>
  )
}

export default AllSlots


