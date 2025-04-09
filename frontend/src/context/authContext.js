import { createContext, useState, useEffect } from "react";
import axios from "../axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  // check at page reload
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, []);

  // if get user data if logged in
  const fetchUserData = async (token) => {
    try {
      // get user info
      let response = await axios.get("/api/dashboard/");
      // console.log(response.data);
      setUser(response.data.user);

      // get user's posts
      response = await axios.get("/api/posts/");
      console.log("POSTS:", response.data);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials, navigate) => {
    try {
      console.log("Sign-up form data:", credentials);
      const response = await axios.post("/api/auth/sign-up/", credentials);
      console.log("response", response.data);
      alert("Sign UP Successful.");
      // navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // login user
  const login = async (credentials, navigate) => {
    try {
      console.log("Login form data:", credentials);
      const response = await axios.post("/api/auth/sign-in/", credentials);

      const _user = JSON.stringify(response.data.user);
      const token = response.data.access;
      const refresh = response.data.refresh;

      localStorage.setItem("token", token);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("user", _user);
      setUser(_user);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await fetchUserData(token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setPosts([]);
  };

  // get posts
  const get_posts = async (onlyMine = false) => {
    try {
        const endpoint = onlyMine ? "/api/posts/?mine=true" : "/api/posts/";
        const response = await axios.get(endpoint);
        // console.log("POSTS:", response.data);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
  };

  // Create post
  const create_post = async (data) => {
    try {
      console.log("Create post data", data);
      const response = await axios.post("/api/posts/", data);
      console.log(response);
      alert("Post Created.");
      fetchUserData(localStorage.getItem("token"));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const update_post = async (formData) => {
    try {
      console.log("Update post data", formData);
      const response = await axios.put(`api/posts/`, formData);
      // alert("Like successful.");
      fetchUserData(localStorage.getItem("token"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        posts,
        fetchUserData,
        login,
        logout,
        loading,
        register,
        get_posts,
        create_post,
        update_post,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
