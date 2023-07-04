import React, { Suspense, useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navigate, Outlet } from "react-router";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import ForgotPassword from "./components/forgotPassword.component"
import Dashboard from "./components/dashboard";


function App() {
  const isloggedIn = JSON.parse(localStorage.getItem("loggedIn"));


  const useAuth = () => {
    const token = window.localStorage.getItem("token");
    const isLoggedIn = token !== null;
    return { isLoggedIn };
  };
  
const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuth();
  const token = window.localStorage.getItem("token");

  return isLoggedIn && token ? <Outlet /> : <Navigate to="/" />;
};



  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              exact
              path="/"
              element={isloggedIn === "true" ? <Dashboard /> : <Login />}
            />
            <Route exact path="/" element={<Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
export default App;
