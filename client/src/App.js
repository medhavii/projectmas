import Login from "./pages/Login";
import Header from "./components/shared/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
// import Footer from "./components/shared/Footer";
import PrivateRoute from './PrivateRoute.js'
import AuthState from "./context/authState";
import AddSlots from "./pages/AddSlots";
import BookSlot from "./pages/BookSlot";

function App() {
  
  return (
    <>
      
      <div>
      {/* <PrivateRoute> */}
      <AuthState>
        
        <BrowserRouter>
           <Header />
          <Routes>
          
            <Route element={<PrivateRoute />}>
              <Route path="/bookslots" element={<BookSlot/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/addslots" element={<AddSlots/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
          </Routes>
          {/* <Footer />         */}
        </BrowserRouter>
        </AuthState>
      </div>
     
    </>
  );
}

export default App;