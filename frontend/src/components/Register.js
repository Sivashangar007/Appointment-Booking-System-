import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate hook
import "./Register.css"; // ✅ Import the CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    city: "",
    email: "",
    password: "",
  });

  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [nameCityMessage, setNameCityMessage] = useState("");
  const navigate = useNavigate(); // ✅ Initialize the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      // Password length validation (5 to 8 characters)
      const isValidPassword = value.length >= 5 && value.length <= 8;
      if (isValidPassword) {
        setPasswordValid(true);
        setPasswordMessage(""); // Clear message on valid password
      } else {
        setPasswordValid(false);
        setPasswordMessage("Password length should be 5-8 characters.");
      }
    }

    // Validate fullName and city to avoid special characters
    if (name === "fullName" || name === "city") {
      const isValidNameCity = /^[A-Za-z\s]*$/.test(value);
      if (!isValidNameCity) {
        setNameCityMessage(`${name === "fullName" ? "Full Name" : "City"} should not contain special characters.`);
      } else {
        setNameCityMessage(""); // Clear message if valid
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleKeyPress = (e) => {
    // Allow only alphabets and spaces for fullName and city
    const regex = /^[A-Za-z\s]*$/;
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Log form data before submitting

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        formData
      );
      alert(response.data.message); // Show success message

      // Navigate to login page after success
      navigate("/"); // Navigate to the login page ("/") after clicking OK on the success message
    } catch (error) {
      console.error("Error during registration:", error);
      alert(error.response?.data?.error || "Error registering user");
    }
  };

  return (
    <div className="register-form-container">
      <h2 className="register-form-title">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            onKeyPress={handleKeyPress} // Prevent special characters while typing
            required
          />
          {/* Message for invalid fullName */}
          {nameCityMessage && nameCityMessage.includes("Full Name") && (
            <p className="error-message">{nameCityMessage}</p>
          )}
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder="Enter your city"
            value={formData.city}
            onChange={handleChange}
            onKeyPress={handleKeyPress} // Prevent special characters while typing
            required
          />
          {/* Message for invalid city */}
          {nameCityMessage && nameCityMessage.includes("City") && (
            <p className="error-message">{nameCityMessage}</p>
          )}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />
          {/* Message box near the password */}
          <div className="password-rules">
            {!passwordValid && passwordMessage && (
              <p className="password-message">{passwordMessage}</p>
            )}
          </div>
        </div>
        <button className="register-form-button" type="submit" disabled={!passwordValid || nameCityMessage}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
