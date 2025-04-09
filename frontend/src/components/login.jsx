import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom"
import AuthContext from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" })
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        login(credentials, navigate);
    };

    return (
        <div className="card p-4">
            <h4 className="mx-2 mb-4 fw-bold">USER SIGNIN</h4>
            <label className="mt-2">Username *</label>
            <input type="text" className="form-control rounded-pill my-1" name="username" placeholder="Enter Username" onChange={handleChange} required />

            <label className="mt-2">Password *</label>
            <input type="password" className="form-control rounded-pill my-1" name="password" placeholder=" Enter Password" onChange={handleChange} required />
            
            <button className="btn btn-success rounded-pill mt-4 fw-bolder w-100" onClick={handleSignIn}>LOG ME IN</button>
        </div>
    );
};
