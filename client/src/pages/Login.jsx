
import React, { useState,useContext} from "react";
import { Alert } from "@mui/material";
import authContext from "../context/authContext";
import { useNavigate } from 'react-router';
const Login = () => {
  const navigate = useNavigate()
  const updateContext = useContext(authContext)
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("")
 
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log({contact,password})
    const response = await fetch('https://projectmas.vercel.app/v1/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contact, password }),
    });

     if(response.ok){
      const {name,error} = await response.json();
      console.log({name,error})
      if(name){
        updateContext.login = true
        updateContext.data = {"name":name,"contact":contact}
        navigate("/dashboard")
      }else{
         setError("wrong number or password")
      }
      console.log(updateContext)
     }else{
      const { message } = await response.json();
      setError(message);
     }
    
  };

  return (
      <>
       <div className="mt-10 md:mt-12 md:flex items-center justify-around py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
  
        <div>
          <h2 className="mt-10 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm space-y-5">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Phone
              </label>
              <input
                id="email-address"
                name="email"
                type="number"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="phone"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="/" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
            <div className="text-sm text-center mt-5">
              <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                dont have an account ? register
              </a>
              {error && <Alert severity="error" >{error}</Alert>}
            </div>
          </div>
        </form>
      </div>
    </div> 
      
      </>
  );
}
export default Login;
