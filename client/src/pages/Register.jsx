import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Alert } from "@mui/material";
import authContext from "../context/authContext";
const Register = () => {

  const updateContext = useContext(authContext)
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("request made")
    const formData = { name, contact, email, password}
    try {
      const response = await fetch('http://localhost:3000/v1/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Signup successful
        const { name, number,role } = await response.json()
        console.log(updateContext)
        updateContext.data = {"name" : name, "number" : number}
        updateContext.login = true;
        console.log(updateContext)
        navigate("/dashboard")
      } else {
        const { message } = await response.json();
        setError(message);
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred');
    }

  };

  return (
    <>
      <div className="mt-5 md:mt-12  items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <h2 className="text-5xl font-bold text-gray-900 text-center">
          One step closer to book your<span className="text-blue-700"> Slots</span> !!
        </h2>
        <h2 className="mt-10 text-center text-3xl font-bold text-gray-900">
              create your account
            </h2>
        <div className="max-w-lg mx-auto">
          <form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm space-y-2">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="mt-5 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="mobile" className="sr-only">
                  Mobile
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  autoComplete="mobile number"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="phone number"
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
                  placeholder="re-Enter Password"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                />
              </div>
             
            </div>


            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
              <div className="text-sm text-center mt-5">
                <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  already have an account ? Login
                </a>
              </div>
              {error && <Alert severity="error">{error}</Alert>}
            </div>
          </form>
        </div>
      </div>

    </>
  );
}
export default Register;