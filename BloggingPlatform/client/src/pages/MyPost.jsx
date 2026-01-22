import { useContext, useEffect, useState } from "react";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import UserPost from "../components/UserPost";
import { useLocation } from "react-router-dom";

export default function MyPost() {
  const { serverUrl, post, setPost } = useContext(userDataContext);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setLoading(true);

        const res = await axios.get(serverUrl + "/api/user/myposts", {
          withCredentials: true,
        });

        const data = Array.isArray(res.data) ? res.data : res.data.posts;
        setPost(data);

        setLoading(false);
      } catch (error) {
        console.log("Load error :", error.message);
        setLoading(false);
      }
    };

    if (serverUrl) {
      fetchUserPosts();
    }
  }, [serverUrl, location.pathname, setPost]);

  return (
    <>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : Array.isArray(post) && post.length > 0 ? (
        post.map((item) => (
          <UserPost key={item._id} post={item} setPost={setPost} />
        ))
      ) : (
        <p className="no-posts text-center mt-2">No posts found.</p>
      )}
    </>
  );
}
