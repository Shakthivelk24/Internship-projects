import { useState, useEffect, useContext } from "react";
import { userDataContext } from "../context/UserContext";
import axios from "axios";
import Post from "../components/Post";
import { useLocation, useNavigate } from "react-router-dom";

export default function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { serverUrl, userData } = useContext(userDataContext);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const search = query.get("search") || "";
  const page = parseInt(query.get("page")) || 1;
  useEffect(() => {
    const fetchAllPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${serverUrl}/api/user/allposts/public`,
        );
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error fetching all posts:", error.message);
      }
    };
    const fetchAllPostsUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${serverUrl}/api/user/allposts`, {
          withCredentials: true,
        });
        setPosts(response.data);
        setLoading(false);

      } catch (error) {
        console.log("Error fetching all posts for user:", error.message);
        setLoading(false);
      }
    };
    if (userData) {
      fetchAllPostsUser();
    } else {
      fetchAllPosts();
    }
  }, [userData, serverUrl]);
    
    useEffect(() => {
  const userload = async () => {
    const res = await axios.get(
      serverUrl + "/api/user/search?search=" + search + "&page=" + page , {
        withCredentials: true,
      }
    );
    setPosts(res.data.posts);
    setTotalPages(res.data.totalPages);
  };

  const load = async () => {
    const res = await axios.get(
      serverUrl + "/api/user/search/public?search=" + search + "&page=" + page
    );
    setPosts(res.data.posts);
    setTotalPages(res.data.totalPages);
  };
  if (userData) {
    userload();
  } else {
    load();
  }
}, [search, page, userData]);

  return (
    <>
      {loading ? (
        <p className="no-posts text-center mt-2">Loading...</p>
      ) : !posts || posts.length === 0 ? (
        <p className="no-posts text-center mt-2">No posts</p>
      ) : (
        posts.map((post) => <Post key={post._id} Post={post} />)
      )}
    </>
  );
}
