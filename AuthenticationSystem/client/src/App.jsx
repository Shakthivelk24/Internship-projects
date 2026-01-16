import {useContext} from 'react'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import { Routes, Route } from 'react-router-dom'
import { userDataContext } from './context/UserContext.jsx'
import { Navigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Home from './pages/Home.jsx'

function App() {
  const {userData,setUserData} = useContext(userDataContext);
  return (
   <>
    <Toaster />
    <Routes>
        <Route path="/" element={userData ? <Home /> : <Navigate to={"/signin"} />} />
        <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
    </Routes> 
   </>
  )
}

export default App
