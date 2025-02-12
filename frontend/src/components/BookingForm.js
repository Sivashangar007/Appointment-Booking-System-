import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookingForm.css";

const BookingForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    contact: "",
    reason: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [bookedSlots, setBookedSlots] = useState({}); // Keep track of booked slots for each date
  const [availableTimes, setAvailableTimes] = useState([]); // Available time slots for the selected date
  const [showTimePopup, setShowTimePopup] = useState(false);

  useEffect(() => {
    // Fetch all booked slots on page load
    axios.get("http://localhost:5000/api/booked-slots")
      .then(response => setBookedSlots(response.data))
      .catch(error => console.error("Error fetching booked slots:", error));

    // Generate time slots (9:00 AM to 5:00 PM in 30-minute increments)
    const times = [];
    let startTime = new Date(0, 0, 0, 9, 0, 0); // 9:00 AM
    const endTime = new Date(0, 0, 0, 17, 0, 0); // 5:00 PM

    while (startTime <= endTime) {
      let hours = startTime.getHours();
      let minutes = startTime.getMinutes();
      let formattedTime = `${hours % 12 || 12}:${minutes === 0 ? "00" : minutes} ${hours < 12 ? "AM" : "PM"}`;
      times.push(formattedTime);
      startTime.setMinutes(startTime.getMinutes() + 30); // Increment by 30 minutes
    }

    setAvailableTimes(times); // Set available times in state
  }, []);

  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(""), 4000);
  };

  const showSuccess = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000);
  };

  const validateName = (name) => /^[A-Za-z\s]+$/.test(name);
  const validateContact = (contact) => /^0\d{9}$/.test(contact);
  const validateReason = (reason) => /^[a-zA-Z0-9 ]*$/.test(reason);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!validateName(form.name)) {
      showError("❌ Name can only contain letters and spaces.");
      setLoading(false);
      return;
    }

    if (!validateContact(form.contact)) {
      showError("❌ Contact number must start with 0 and be 10 digits long.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointments", form
      );

      if (response && response.data) {
        showSuccess("✅ Appointment booked successfully!");
        setForm({ name: "", contact: "", reason: "", date: "", time: "" });
        updateBookedSlots(form.date, form.time); // Update booked slots for the selected date
      }
    } catch (err) {
      showError("❌ Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setForm({ ...form, date: selectedDate });

    // Get booked slots for the selected date
    const bookedForDate = bookedSlots[selectedDate] || [];
    const availableForDate = availableTimes.filter(time => !bookedForDate.includes(time));
    setAvailableTimes(availableForDate);
  };

  const handleTimeSelect = (time) => {
    setForm({ ...form, time });
    setShowTimePopup(false);
  };

  const updateBookedSlots = (date, time) => {
    // Update the booked slots state to reflect the new booking
    setBookedSlots((prevBookedSlots) => {
      const newBookedSlots = { ...prevBookedSlots };
      if (!newBookedSlots[date]) {
        newBookedSlots[date] = [];
      }
      newBookedSlots[date].push(time);
      return newBookedSlots;
    });

    // Re-calculate available times for the selected date
    const bookedForDate = bookedSlots[date] || [];
    const availableForDate = availableTimes.filter(time => !bookedForDate.includes(time));
    setAvailableTimes(availableForDate);
  };

  const handleLogout = () => {
    // Clear any session/local storage items (if needed)
    localStorage.removeItem("user"); // Or sessionStorage.removeItem("user") if using session storage

    // Redirect to login page
    navigate("/");
  };

  return (
    <div className="booking-form-container">
      <div className="booking-form-wrapper">
        <button className="my-appointments-button" onClick={() => navigate("/myappointment")}>
          My Appointments
        </button>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>

        <h1>Appointment Booking</h1>

        {message && <div className="success">{message}</div>}
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={(e) => {
                if (validateName(e.target.value) || e.target.value === "") {
                  setForm({ ...form, name: e.target.value });
                } else {
                  showError("❌ Name can only contain letters and spaces.");
                }
              }}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Contact</label>
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) {
                  setForm({ ...form, contact: e.target.value });
                } else {
                  showError("❌ Contact must contain only numbers.");
                }
              }}
              placeholder="Enter your contact number"
              required
            />
          </div>

          <div className="form-group">
            <label>Reason</label>
            <input
              type="text"
              name="reason"
              value={form.reason}
              onChange={(e) => {
                if (validateReason(e.target.value)) {
                  setForm({ ...form, reason: e.target.value });
                } else {
                  showError("❌ Special characters are not allowed.");
                }
              }}
              placeholder="Booking Reason"
              required
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleDateChange}
              required
              min={new Date().toISOString().split("T")[0]} // Disable past dates
            />
          </div>

          <div className="form-group">
            <label>Time Slot</label>
            <input
              type="text"
              name="time"
              value={form.time}
              readOnly
              onClick={() => setShowTimePopup(true)}
              placeholder="Click to select a time slot"
              required
            />
          </div>

          {showTimePopup && (
            <div className="time-slot-popup">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  className="time-slot"
                  onClick={() => handleTimeSelect(time)}
                  disabled={bookedSlots[form.date]?.includes(time)} // Disable booked time slots
                >
                  {time}
                </button>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="booking-form-button"
            disabled={loading || !form.time}
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
