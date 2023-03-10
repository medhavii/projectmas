
import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const data = [
     {
        "name" : "Home",
        "link" : "/"
     },
     {
        "name" : "About",
        "link" : "/"
     },
     {
        "name" : "Dashboard",
        "link" : "/dashboard"
     },

     {
        "name" : "Sign Up",
        "link" : "/signup",
        "style" : "s"
     }
]
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation()

  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
          { location.pathname != '/dashboard'  &&
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={handleToggle}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button> }
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-center  sm:justify-start">
            <div className="flex-shrink-0">
             {/* insert logo here */}
            </div>
            <div className="hidden md:flex ml-auto">
                  {data.map((data)=>(
                        <div className="px-9 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 "><Link to={data.link}>{data.name}</Link></div>
                  ))}
            </div>
          </div>
        </div>
    
        {/* Mobile menu, show/hide based on menu state. */}
        {isOpen && <div className="md:hidden">
                {data.map((data)=>(
                        <div className="text-center px-9 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"><Link to={data.link}>{data.name}</Link></div>
                  ))}
        </div>}
        
      </div>
    </nav>
  )
}

export default Header