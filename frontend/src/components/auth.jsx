import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";
import { SignUpForm } from "./signup";
import { LoginForm } from "./login";

const AuthForm = () => {
    const [activeTab, setActiveTab] = useState("login");
    const { user} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    return (
        <div className="container mt-4 w-50">
            {/* Header Tabs */}
            <div className="d-flex mb-4">
                <button
                    className={`btn ${activeTab === "login" ? "btn-success fw-bolder" : "btn-light"} rounded-pill w-50`}
                    onClick={() => setActiveTab("login")}
                >
                    SIGNIN
                </button>
                <button
                    className={`btn ${activeTab === "signup" ? "btn-success fw-bolder" : "btn-light"} rounded-pill w-50`}
                    onClick={() => setActiveTab("signup")}
                >
                    SIGNUP
                </button>
            </div>

            {/* Signup Form */}
            {activeTab === "signup" && (
                <SignUpForm />
            )}

            {/* Login Form */}
            {activeTab === "login" && (
                <LoginForm />
            )}
        </div>
    );
};

export default AuthForm;
