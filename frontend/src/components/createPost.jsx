import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";

const PostCreate = () => {
    const { create_post } = useContext(AuthContext);
    

    const [formData, setFormData] = useState({post: ""});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        create_post(formData);
    };

    return (
        <div className="container mt-4 w-50">
            <div className="d-flex justify-content-between mb-2">
                <h2 className=" mx-2 mt-2">Post New Question</h2>
                <Link to="/dashboard"  className="btn btn-secondary mt-3">Back to Deashboard</Link>
            </div>

            <form onSubmit={handleSubmit} className="card p-4">

                <div className="mb-3">
                    <label className="form-label">Details</label>
                    <textarea
                        name="post"
                        className="form-control"
                        rows="4"
                        value={formData.post}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-success rounded-pill fw-bolder">
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default PostCreate;
