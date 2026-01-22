import { Link, useNavigate, useLocation } from "react-router-dom";
import { userDataContext } from "../context/UserContext.jsx";
import { useContext, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Header() {
  const { userData, setUserData, serverUrl } = useContext(userDataContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const location = useLocation();
  const timer = useRef(null);

  const handleChange = (e) => {
    const val = e.target.value;
    setText(val);

    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      if (!val.trim()) {
        navigate("/");
      } else {
        navigate("/?search=" + val + "&page=1");
      }
    }, 500);
  };

  const handleLogOut = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      navigate("/");
      setUserData(null);
      toast.success(result.data.message);
    } catch (error) {
      console.log("Error in logging out :", error);
      toast.error("Error in logging out");
    }
  };

  return (
    <header className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center gap-3">
        {/* click on SparkNote to go to home page and its is the logo of the website */}
        <Link to="/" className="text-2xl font-bold text-slate-800 cursor-pointer">
          SparkNote  <span className="text-slate-500 text-sm">- Share Your Stories</span>
        </Link>
        {/* Search */}
        {location.pathname === "/" && (
          <form className="hidden sm:block">
            <input
              type="text"
              value={text}
              onChange={handleChange}
              placeholder="Search post"
              className="border px-3 py-2 rounded w-48"
            />
          </form>
        )}

        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>

        <nav className="hidden md:flex gap-4">
          {userData ? (
            <>
              <Link
                to="/create-post"
                className="border p-2 bg-green-500 text-white rounded"
              >
                Create Post
              </Link>
              <Link
                to="/mypost"
                className="border p-2 bg-yellow-500 text-white rounded"
              >
                My Posts
              </Link>
              <button
                onClick={handleLogOut}
                className="border p-2 bg-red-500 text-white rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="border p-2 bg-blue-500 text-white rounded"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border p-2 bg-orange-500 text-white rounded"
              >
                Create Account
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Mobile search */}
      {location.pathname === "/" && (
        <form className="sm:hidden mt-3">
          <input
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="Search post"
            className="border px-3 py-2 rounded w-48"
          />
        </form>
      )}

      {open && (
        <nav className="md:hidden mt-4 grid gap-3">
          {userData ? (
            <>
              <Link
                to="/create-post"
                className="border p-2 bg-green-500 text-white rounded"
              >
                Create Post
              </Link>
              <Link
                to="/mypost"
                className="border p-2 bg-yellow-500 text-white rounded"
              >
                My Posts
              </Link>
              <button
                onClick={handleLogOut}
                className="border p-2 bg-red-500 text-white rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="border p-2 bg-blue-500 text-white rounded"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border p-2 bg-orange-500 text-white rounded"
              >
                Create Account
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
}
