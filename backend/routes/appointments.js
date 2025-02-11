const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// POST route to create a new appointment
router.post("/appointments", async (req, res) => {
  try {
    const { name, contact, date, time, reason } = req.body;

   /**  const existing = await Appointment.findOne({ where: { contact } });
    if (existing)
      return res.status(400).json({ message: "Contact already used." });**/

    const appointment = await Appointment.create({ name, contact, date, time, reason });
    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment." });
  }
});

// GET route to fetch all booked slots
router.get("/booked-slots", async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    const grouped = {};
    appointments.forEach((a) => {
      if (!grouped[a.date]) grouped[a.date] = [];
      grouped[a.date].push(a);
    });
    res.json(grouped);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booked slots." });
  }
});

// GET route to fetch available dates
router.get("/available-dates", async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    const dates = [...new Set(appointments.map((a) => a.date))];
    res.json(dates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching available dates." });
  }
});

// DELETE route to cancel an appointment by its ID
router.delete("/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Delete the appointment
    await appointment.destroy();
    res.status(200).json({ message: "Appointment canceled successfully" });
  } catch (error) {
    console.error("Error canceling appointment:", error);
    res.status(500).json({ message: "Error canceling appointment." });
  }
});

module.exports = router;
