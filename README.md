Appointment Booking System

Introduction

  The Appointment Booking System is a simple web-based application that allows users to:

      View available time slots for appointments

      Book an appointment

      View their booked appointments

      Cancel an appointment

Technologies Used

    Front-End HTML, CSS (Plain CSS) – For structuring and styling the user interface

    Back-End Node.js – For handling the server-side logic

    Express.js – For creating RESTful APIs

    MySQL – Database management system

Database

    MySQL Database (Schema Name: appointment_db)

    Tables include:

      appointments – Stores appointment details (date, time, user details)

      users (if authentication is implemented) – Stores user information

Features



      View Available Slots: Users can check available appointment slots.

      Book an Appointment: Users can select a date and time to book an appointment.

      View Appointments: Users can see their booked appointments.

      Cancel Appointment: Users can delete their booked appointments.



Installation and Setup

Prerequisites

Ensure you have the following installed on your system:

    Node.js
  
    MySQL

    Git (optional)

Steps to Set Up Locally

  Clone the Repository

    git clone <repository-url>
    cd appointment-booking-system

Install Dependencies

    npm install

Database Setup

     Create a MySQL database named appointment_db

I    mport the provided SQL file (appointment_db.sql)

     Update database credentials in the .env file (if applicable)

Start the Server

    npm stat
The backend will be running at http://localhost:5000.

Run the Front-End
  Open index.html in a browser (if using a simple HTML/CSS front-end).




Validating user input effectively

Ensuring database integrity with transactions
