import { Link } from "react-router-dom";
import { userDataContext } from "../context/UserContext.jsx";
import { useContext,useEffect } from "react";
import axios from "axios";

export default function Header() {
  const { userData,setUserData,serverUrl } = useContext(userDataContext);

   const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log("Current User Data:", result.data);
    } catch (error) {
      console.error("Error fetching current user data:", error);
    }
  };
  useEffect(() => {
    handleCurrentUser();
  }, []);
  
  return (
    <header className="max-w-5xl mx-auto px-4 py-6 flex justify-between items-center">
      <Link
        to="/"
        className="text-2xl font-bold text-slate-800"
      >
        MyBlog
      </Link>
      <nav className="flex gap-4">
        {userData ? (
          <Link >Create Post</Link>
        ) : (
          <>
         <Link
            to="/login"
            className="text-slate-600 hover:text-emerald-500 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="text-slate-600 hover:text-emerald-500 transition"
          >
            Create Account
          </Link>
          </>
        )}
      </nav>
    </header>
  );
}
