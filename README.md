Introduction:
	The Appointment Booking System is a simple web-based application that allows users to:

    		View available time slots for appointments

		Book an appointment

		View their booked appointments

		Cancel an appointment 
 Technologies Used:
	Frontend:HTML, CSS (Plain CSS) – For structuring and styling the user interface
 	Backend:
  		Node.js
    		Express.js
      		MySQL

 Database:
 	MySQL Database (Schema Name: appointment_db)
  	Tables include:
   		appointments – Stores appointment details (date, time, user details)
     		users (if authentication is implemented) – Stores user information


Features:
	User registeration: New users can register there details.
 	Login: Registered users can loigin into the system with thir email and password.
	View Available Slots: Users can check available appointment slots.
 	Book an Appointment: Users can select a date and time to book an appointment.
  	Cancel Appointment: Users can delete their booked appointments.
   	Security: The users passwords are stored in database as hashed passwords. 



Installation and Setup

Prerequisites:
	Ensure you have the following installed on your system:

		Node.js

		MySQL

		Git (optional)

   	Steps to Set Up Locally
    		Clone the Repository git clone <https://github.com/Sivashangar007/Appointment-Booking-System-.git>
		cd appointment-booking-system

  	Install Dependencies
   		npn install


Database setup
	Create a MySQL database named appointment_db

	Import the provided SQL file (appointment_db.sql)

	Update database credentials in the .env file (if applicable)


  Start the Server
  	npm start
	
    	
 	
	
     		
   		
  	
 		
