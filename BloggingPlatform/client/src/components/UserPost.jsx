import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { userDataContext } from "../context/UserContext";
import toast from "react-hot-toast";

export default function UserPost({ post, setPost }) {
  const navigate = useNavigate();
  const { serverUrl } = useContext(userDataContext);

  const handleDelete = async (id) => {
    try {
      await axios.delete(serverUrl + "/api/user/deletepost/" + id, {
        withCredentials: true,
      });

      toast.success("Post deleted");

      // remove post from list without reload
      setPost((old) => old.filter((p) => p._id !== id));
    } catch (error) {
      toast.error("Delete error");
      console.log("Delete error :", error.message);
    }
  };

  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto mb-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/5 bg-gray-100">
          <img
            src={post.postImage}
            alt={post.title}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>

        <div className="md:w-3/5 p-8">
          <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
          <p className="mb-6">{post.content}</p>

          <div className="flex gap-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => navigate("/edit-post/" + post._id)}
            >
              Edit
            </button>

            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleDelete(post._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
