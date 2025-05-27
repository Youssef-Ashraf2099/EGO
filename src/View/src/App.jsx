import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Login from "./login";
import Register from "./register";
import SendOTP from "./sendOtp";
import ForgotPassword from "./forgotPassword";
import Footer from "./footer";
import AboutUs from "./AboutUs";
import Terms from "./Terms";
import Privacy from "./Privacy";
import Navbar from "./main page/navbar";
import HomePage from "./HomePage";
import EventPage from "./EventPage";
import Profile from "./Profile";
import EventDetails from "./EventDetails";
import PageNotFound from "./PageNotFound";
import BookingEvent from "./BookingEvent";
import AllUsersPage from "./AllUsersPage";
import AdminEvents from "./AdminEvents";
import EditEventPage from "./EditEventPage";
import CreateEventPage from "./main page/CreateEventPage";
import UnAuthorized from "./UnAuthorized";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Organizer only */}
        <Route
          path="/events/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["Organizer"]}>
              <EditEventPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/create/new"
          element={
            <ProtectedRoute allowedRoles={["Organizer"]}>
              <CreateEventPage />
            </ProtectedRoute>
          }
        />

        {/* Public and Standard User */}
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventPage />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sendOtp" element={<SendOTP />} />
        <Route path="/forgetPassword" element={<ForgotPassword />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/Terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* All authenticated users */}
        <Route
          path="profile"
          element={
            <ProtectedRoute
              allowedRoles={["Standard User", "Organizer", "System Admin"]}
            >
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Standard User only */}
        <Route
          path="/bookings"
          element={
            <ProtectedRoute allowedRoles={["Standard User"]}>
              <BookingEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings/:id"
          element={
            <ProtectedRoute allowedRoles={["Standard User"]}>
              <BookingEvent />
            </ProtectedRoute>
          }
        />

        {/* System Admin only */}
        <Route
          path="/events/all"
          element={
            <ProtectedRoute allowedRoles={["System Admin"]}>
              <AdminEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["System Admin"]}>
              <AllUsersPage />
            </ProtectedRoute>
          }
        />

        {/* Unauthorized */}
        <Route path="/unauthorized" element={<UnAuthorized />} />

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
