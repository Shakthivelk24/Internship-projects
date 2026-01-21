import { useContext, useEffect, useRef, useState } from "react";
import { userDataContext } from "../context/UserContext.jsx";
import { useNavigate,useParams } from "react-router-dom";
import { LuImageUp } from "react-icons/lu";
import axios from "axios";
import toast from "react-hot-toast";

function EditPost() {
  const { id } = useParams();

  const {
    serverUrl,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(userDataContext);
  const inputImage = useRef(null);
  const [editPost, setEditPost] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(() =>{
    const fetchPostByID = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/user/post/${id}`, {
          withCredentials: true,
        });
        const data = response.data;
        setEditPost(data);
      } catch (error) {
        console.log("Error fetching post by ID:", error.message);
      }
    };
    fetchPostByID();
  }, []);
  useEffect(() => {
  if (editPost && editPost.title) {
     setTitle(editPost.title);
     setContent(editPost.content);
  }
 }, [editPost]);
 const handleSave = async () => { 
      setLoading(true);
      try {
      const formData = new FormData();
      formData.append("postImage", backendImage);
      formData.append("title", title);
      formData.append("content", content);
      await axios.put(`${serverUrl}/api/user/editpost/${id}`, formData, {
        withCredentials: true,
      });
      setLoading(false);
      toast.success("Post updated successfully");
      navigate("/mypost");
      } catch (error) {
        console.log("Error updating post:", error.message);
        setLoading(false);
        toast.error("Error updating post");
      }
  }
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-5">
      <div
        className={`w-[300px] h-[200px] lg:w-[555px] lg:h-[350px] overflow-hidden border-2 border-[#2a2a6e] rounded-2xl cursor-pointer flex items-center justify-center ${
          selectedImage === "input"
            ? "border-black border-4 shadow-black shadow-2xl"
            : ""
        }`}
        onClick={() => {
          inputImage.current.click();
          setSelectedImage("input");
        }}
      >
        {!frontendImage && editPost.postImage && (
          <img
            src={editPost.postImage}
            alt="post"
            className="w-full h-full object-cover rounded-2xl"
          />
        )}

        {!frontendImage && !editPost.postImage && (
          <LuImageUp className="text-black w-[25px] h-[25px]" />
        )}

        {frontendImage && (
          <img
            src={frontendImage}
            alt="custom"
            className="w-full h-full object-cover rounded-2xl"
          />
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={inputImage}
        hidden
        onChange={handleImage}
      />

      <div>
        <h1 className="font-semibold text-lg mb-2">Title</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-[300px] h-[60px] lg:w-[555px] lg:h-[60px] text-center font-semibold border rounded-lg outline-none focus:ring-2 ring-blue-400"
        />
      </div>

      <div>
        <h1 className="font-semibold text-lg mb-2">Content</h1>
        <textarea
          value={content}
          minLength={100}
          maxLength={500}
          onChange={(e) => setContent(e.target.value)}
          className="w-[300px] h-[100px] lg:w-[555px] lg:h-[120px] p-3 font-semibold border rounded-lg outline-none focus:ring-2 ring-blue-400"
        />
        <p className="mt-1 text-sm text-gray-600">
          {content.length} / 500 characters
        </p>
      </div>

      <div className="flex gap-3">
        <button
          className="min-w-[150px] h-[60px] bg-green-500 font-semibold text-white rounded-full hover:bg-green-600"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          className="min-w-[150px] h-[60px] bg-gray-400 font-semibold text-white rounded-full hover:bg-gray-500"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditPost;
