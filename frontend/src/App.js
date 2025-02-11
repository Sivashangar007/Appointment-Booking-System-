import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookingForm from "./components/BookingForm";
//import Login from "./components/Login";
//import Profile from "./components/Profile";
//import Register from "./components/Register";

import MyAppointments from "./components/MyAppointments";
import Register from "./components/Register";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/myappointment" element={<MyAppointments />} />
        <Route path="/" element={<Register />} />

        

      </Routes>
    </Router>
  );
}

export default App;
