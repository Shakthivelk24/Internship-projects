import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/userContext.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl, userData, setUserData } = useContext(userDataContext);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Signing up with:", { name, email, password });
      let result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      setUserData(result.data);
      toast.success("Signed Up Successfully");
      setLoading(false);

      navigate("/");
    } catch (err) {
      setUserData(null);
      toast.error(err.response?.data?.message || "Sign Up Failed");
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[#100e02] to-[#011652] flex flex-col justify-center items-center overflow-y-scroll relative p-4">
      <form
        className="w-[90%] h-135 max-w-110 bg-[#0630ffd7] backdrop-blur-md:shadow-lg shadow-yellow-300 flex flex-col items-center justify-center gap-6 p-6 rounded-lg px-[30px] hover:bg-[#0a06ffa4]"
        onSubmit={handleSignUp}
      >
        <h1 className="text-white text-[30px] font-semibold mb-[30px]">
          <span className="text-white text-2xl font-semibold">
            Create An Account
          </span>
        </h1>
        <input
          type="text"
          placeholder="Enter your Name"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-400 px-[20px] py-[10px] text-[18px] rounded-full"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
        <input
          type="email"
          placeholder="Enter your Email"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-400 px-[20px] py-[10px] text-[18px] rounded-full"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <div className="w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] flex items-center px-5">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full h-full bg-transparent outline-none placeholder-gray-400 text-white"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-white text-xl cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button
          type="submit"
          className="min-w-[150px] h-[60px] mt-[10px] bg-cyan-500 text-1xl font-semibold text-white rounded-full hover:bg-cyan-600 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <p className="text-white text-[15px]">
          Already have an account?{" "}
          <span
            className="text-cyan-500 cursor-pointer hover:underline"
            onClick={() => {
              navigate("/");
            }}
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
}
export default SignUp;
