import { Link } from "react-router-dom";
import { userDataContext } from "../context/UserContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const { userData, setUserData, serverUrl } = useContext(userDataContext);
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      navigate("/");
      setUserData(null);
    } catch (error) {
      console.log("Error in logging out :", error);
    }
  };
  return (
    <header className="max-w-5xl mx-auto px-4 py-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-slate-800">
        MyBlog
      </Link>
      <nav className="flex gap-4">
        {userData ? (
          <>
            <Link to="/create-post" className="border p-2 border-slate-800 bg-green-500 hover:bg-green-700 text-white font-semibold rounded">Create Post</Link>
            <Link to="/mypost" className="border p-2 border-slate-800 bg-yellow-500 hover:bg-yellow-700 text-white font-semibold rounded">My Posts</Link>
            <button onClick={handleLogOut} className="border border-slate-800 bg-red-500 hover:bg-red-700 text-white font-semibold rounded p-2">Logout</button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-white transition border p-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="hover:text-white transition border p-2 bg-orange-500 hover:bg-orange-700 text-white font-semibold rounded"
            >
              Create Account
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
