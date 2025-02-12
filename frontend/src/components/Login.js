import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Import the CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", formData);
      alert(response.data.message);
      navigate("/booking"); // Redirect to the booking page
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="login-form-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} required />
        </div>
        <button className="login-form-button" type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <span className="register-link" onClick={() => navigate("/register")}>REGISTER</span>
      </p>
    </div>
  );
};

export default Login;