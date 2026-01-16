import { useContext, useEffect } from "react";
import { userDataContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Home() {
  const { serverUrl, userData, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      toast.success(result.data.message);
      navigate("/signin");
      setUserData(null);
    } catch (error) {
      console.log("Error in logging out :", error);
    }
  };
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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Profile Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 sm:px-6 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-lg shadow p-6 sm:p-8">
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b">
              Profile Information
            </h3>
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <p className="sm:col-span-2 text-gray-900 bg-gray-50 p-3 rounded-lg">
                  {userData.name}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <p className="sm:col-span-2 text-gray-900 bg-gray-50 p-3 rounded-lg break-all">
                  {userData.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
