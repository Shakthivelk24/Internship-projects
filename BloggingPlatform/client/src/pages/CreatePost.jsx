import { useContext, useRef, useState, useEffect } from "react";
import { userDataContext } from "../context/UserContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LuImageUp } from "react-icons/lu";
import toast from "react-hot-toast";

function CreatePost() {
  const {
    serverUrl,
    setPost,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(userDataContext);

  const inputImage = useRef(null);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // clear preview URL on unmount
  useEffect(() => {
    return () => {
      if (frontendImage) {
        URL.revokeObjectURL(frontendImage);
      }
    };
  }, [frontendImage]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
    setSelectedImage("input");
  };

  const handlePost = async () => {
    if (!backendImage || !title || !content) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      let formData = new FormData();
      formData.append("postImage", backendImage);
      formData.append("title", title);
      formData.append("content", content);

      const res = await axios.post(serverUrl + "/api/user/addpost", formData, {
        withCredentials: true,
      });

      setPost(res.data);

      // 🔥 reset everything after success
      setTitle("");
      setContent("");
      setFrontendImage(null);
      setBackendImage(null);
      setSelectedImage(null);

      toast.success("Post created successfully");
      setLoading(false);

      navigate("/mypost");
    } catch (err) {
      console.log("ERR :", err.message);
      toast.error("Error creating post");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-5">

      {/* Image Upload Box */}
      <div
        className={`w-[300px] h-[200px] lg:w-[555px] lg:h-[350px] overflow-hidden border-2 border-[#2a2a6e] rounded-2xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex items-center justify-center ${
          selectedImage === "input"
            ? "border-black border-4 shadow-black shadow-2xl"
            : ""
        }`}
        onClick={() => inputImage.current.click()}
      >
        {!frontendImage && (
          <LuImageUp className="text-black w-[25px] h-[25px]" />
        )}

        {frontendImage && (
          <img
            src={frontendImage}
            alt="preview"
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

      {/* Title */}
      <div>
        <h1 className="font-semibold text-lg mb-2">Title</h1>
        <input
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-[300px] h-[60px] lg:w-[555px] lg:h-[60px] placeholder:text-center text-center font-semibold border rounded-lg outline-none focus:ring-2 ring-blue-400"
        />
      </div>

      {/* Content */}
      <div>
        <h1 className="font-semibold text-lg mb-2">Content</h1>
        <textarea
          placeholder="Enter content here"
          minLength={100}
          maxLength={500}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-[300px] h-[60px] lg:w-[555px] lg:h-[60px] p-3 font-semibold border rounded-lg outline-none focus:ring-2 ring-blue-400"
        />
        <p className="mt-1 text-sm text-gray-600">
          {content.length} / 500 characters (Min 100)
        </p>
      </div>

      {/* Submit Button */}
      {backendImage && title && content && (
        <button
          className="min-w-[150px] h-[60px] mt-[10px] bg-green-500 text-xl font-semibold text-white rounded-full hover:bg-green-600 cursor-pointer"
          onClick={handlePost}
          disabled={loading}
        >
          {loading ? "Posting..." : "Create Post"}
        </button>
      )}
    </div>
  );
}

export default CreatePost;
