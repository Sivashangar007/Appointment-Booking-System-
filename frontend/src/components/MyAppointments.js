import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyAppointments.css";
import React, { useState, useEffect } from "react";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCancel = (id) => {
    axios
      .delete(`http://localhost:5000/api/appointments/${id}`)
      .then(() => {
        setAppointments(appointments.filter((appointment) => appointment.id !== id));
      })
      .catch((err) => {
        console.error("Error canceling appointment:", err);
        setError("Failed to cancel the appointment.");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/booked-slots")
      .then((response) => {
        const data = Object.entries(response.data).flatMap(([date, slots]) =>
          slots.map((slot) => ({
            ...slot,
            date: typeof date === "object" && date.type === "Buffer" ? String.fromCharCode(...date.data) : date,
          }))
        );
        setAppointments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="appointments-container">
      <button className="logout-button" onClick={() => navigate("/")}>
        Logout
      </button>
      <h1>My Appointments</h1>
      <div className="outside-button-container">
        <button className="book-appointment-btn" onClick={() => navigate("/booking")}>
          Book New Appointment
        </button>
      </div>
      {loading && <p className="loading">Loading appointments...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && appointments.length === 0 && <p className="no-appointments">No appointments found.</p>}
      {appointments.length > 0 && (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Date</th>
              <th>Time</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text">
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.name}</td>
                <td>{appointment.contact}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.reason}</td>
                <td>
                  <button className="cancel-btn" onClick={() => handleCancel(appointment.id)}>
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyAppointments;
