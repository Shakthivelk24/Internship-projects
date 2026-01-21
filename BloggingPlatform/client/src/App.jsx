import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePost from "./pages/CreatePost";
import MyPost from "./pages/MyPost";
import EditPost from "./pages/EditPost";
import { useContext } from "react";
import { userDataContext } from "./context/UserContext";
import { Toaster } from "react-hot-toast";

function App() {
  const {userData} = useContext(userDataContext);
  return (
    <>
    <Toaster />
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/create-post" element={userData ? <CreatePost /> : <LoginPage />} />
        <Route path="/mypost" element={userData ? <MyPost /> : <LoginPage />} />
        <Route path="/edit-post/:id" element={userData ? <EditPost /> : <LoginPage />} />
      </Route>
    </Routes>
    
   </> 
  );
}

export default App;
