import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Register.css"; // ✅ Import the CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    city: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);  // Log form data before submitting
  
    try {
      const response = await axios.post("http://localhost:5000/api/register", formData);
      alert(response.data.message);
    } catch (error) {
      console.error('Error during registration:', error);
      alert(error.response?.data?.error || 'Error registering user');
    }
  };
  
  
  return (
    <div className="register-form-container">
      <h2 className="register-form-title">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="fullName" placeholder="Enter your full name" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="number" name="age" placeholder="Enter your age" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" name="city" placeholder="Enter your city" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} required />
        </div>
        <button className="register-form-button" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
