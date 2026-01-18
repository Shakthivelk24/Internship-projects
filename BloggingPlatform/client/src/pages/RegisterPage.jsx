import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext.jsx";
import axios from "axios";


export default function RegisterPage(){
    const { serverUrl, userData ,setUserData } = useContext(userDataContext);
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSignUp = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const res = await axios.post(`${serverUrl}/api/auth/signup`, {
          userName,
          password,
        }, { withCredentials: true });
        setLoading(false);
        setUserData(res.data);
        navigate("/");
      } catch (error) {
        setLoading(false);
        console.log("Signup failed", error);
      }
    };
    return (
      <div className=" flex  justify-center px-4">
      <form className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-6 space-y-4" onSubmit={handleSignUp}>
        <h1 className="text-2xl font-bold text-center text-slate-800">
            Register
        </h1>

        <input
          type="text"
          placeholder="User Name"
          onChange={(e) => setUserName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 ring-emerald-400"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 ring-emerald-400"
        />

        <button disabled={loading} className="w-full py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">
            {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
    )
}