import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { userDataContext } from "../context/UserContext";
import toast from "react-hot-toast";

export default function UserPost({ post }) {
    const navigate = useNavigate();
    const { serverUrl } = useContext(userDataContext);
    const handleDelete = async (id) => {
        try {
           const response = await axios.delete(`${serverUrl}/api/user/deletepost/${id}`, {
            withCredentials: true,
           });
           toast.success("Post deleted successfully");
           navigate(0); // Refresh the page to reflect the deleted post
        } catch (error) {
            toast.error("Error deleting post");
            console.log("Error deleting post:", error.message);
        }
    }
 
return (
    <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden max-w-4xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 relative overflow-hidden bg-gray-100">
                <img
                    src={post.postImage}
                    alt={post.title}
                    className="w-full h-64 md:h-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-500"
                />
            </div>

            <div className="md:w-3/5 p-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                         {post.ownerName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold text-gray-800">{post.ownerName}</span>
                        <time className="text-xs text-gray-500">
                            {new Date(post.updatedAt).toLocaleString()}
                        </time>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {post.title}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6 line-clamp-3 hover:line-clamp-none transition-all duration-300">{post.content}</p>
                <div className="flex gap-2">
                    <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300" onClick={()=>navigate(`/edit-post/${post._id}`)} >Edit</button>
                    <button className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-300" onClick={() => handleDelete(post._id)}>Delete</button> 
                </div>
            </div>
        </div>
    </article>
);
}
