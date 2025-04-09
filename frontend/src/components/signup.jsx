import React, { useContext, useState} from "react";
import "react-phone-input-2/lib/bootstrap.css";
import AuthContext from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const SignUpForm = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username:"",
    email: "",
    password: "",
    confirm_password: "",
  });

  const {
    username,
    email,
    password,
    confirm_password,
  } = credentials;

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    register(credentials, navigate);
  };

  return (
    <div className="card p-4">
      <h3 className="mx-2 mb-4 fw-bold">USER SIGNUP</h3>
      <div className="mt-2">
        <label htmlFor="username" className="form-label">
          Username *
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          placeholder="Enter username"
          value={username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mt-2">
        <label htmlFor="email" className="form-label">
          Email *
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mt-2">
        <label htmlFor="password" className="form-label">
          Password *
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="confirm_password" className="form-label">
          Confirm Password *
        </label>
        <input
          type="password"
          className="form-control"
          id="confirm_password"
          name="confirm_password"
          placeholder="Confirm password"
          value={confirm_password}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-success rounded-pill fw-bold mt-2 w-100"
        onClick={handleSubmit}
      >
        SIGNUP
      </button>
    </div>
  );
};
