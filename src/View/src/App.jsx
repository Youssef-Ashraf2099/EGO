import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios"; // Make sure axios is imported
import Login from "./login"; // make sure this path is correct
import Register from "./register";
import SendOTP from "./sendOtp";
import ForgotPassword from "./forgotPassword";
import Footer from "./footer";
import AboutUs from "./AboutUs"; // make sure this path is correct
import Terms from "./Terms"; // make sure this path is correct
import Privacy from "./privacy";
import Navbar from "./main page/navbar";
import HomePage from "./HomePage"; // make sure this path is correct
import EventPage from "./EventPage"; // make sure this path is correct
import Profile from "./Profile"; // make sure this path is correct
import EventDetails from "./EventDetails";
import PageNotFound from "./pageNotFound";
import BookingEvent from "./BookingEvent"; // make sure this path is correct
import AllUsersPage from "./AllUsersPage"; // make sure this path is correct
import AdminEvents from "./AdminEvents";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/api/v1/login" element={<Login />} />
        <Route path="/api/v1/register" element={<Register />} />
        <Route path="/api/v1/sendOtp" element={<SendOTP />} />
        <Route path="/api/v1/forgetPassword" element={<ForgotPassword />} />
        <Route path="/api/v1/profile" element={<Profile />} />
        <Route path="/api/v1/bookings" element={<BookingEvent />} />
        <Route path="/api/v1/bookings/:id" element={<BookingEvent />} />
        <Route path="/api/v1/events/all" element={<AdminEvents />} />
        <Route path="/api/v1/users" element={<AllUsersPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/Terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
