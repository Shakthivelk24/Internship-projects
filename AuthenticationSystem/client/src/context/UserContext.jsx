import { createContext, useState ,useEffect } from "react";
import axios from "axios";


export const userDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = "http://localhost:8000";
  const [userData, setUserData] = useState(null);
  const value = {
    serverUrl,
    userData,
    setUserData,
  };
    return (
    <div>
      <userDataContext.Provider value={value}> 
        {children} 
      </userDataContext.Provider> 
    </div>
  );
}

export default UserContext;