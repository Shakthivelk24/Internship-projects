import { useContext, useEffect } from "react";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import UserPost from "../components/UserPost";

export default function MyPost() {
  const { serverUrl, userData, setUserData, post, setPost } =
    useContext(userDataContext);
  console.log("server url ", serverUrl);
  console.log("user data ", userData);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/myposts`, {
          withCredentials: true,
        });
        setPost(result.data);
        console.log("User Posts:", result.data);
      } catch (error) {
        console.log("Error fetching user posts:", error.message);
      }
    };

    if (serverUrl) {
      fetchUserPosts();
    }
  }, []);
  
  return (
    <>
        {!post || post.length === 0 ? (
          <p className="no-posts text-center mt-2">No posts found.</p>
        ) : (
          post.map((item) => (
            <UserPost key={item._id} post={item} />
          ))
        )}
    </>
  );
}
