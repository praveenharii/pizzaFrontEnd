import React, { Suspense, useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import ForgotPassword from "./components/forgotPassword.component"
import Dashboard from "./components/dashboard";


function App() {
  const [showTopbar, setShowTopbar] = useState(true);
  const isloggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    if (loggedIn) {
      setShowTopbar(false);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        {showTopbar && (
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>
                positronX
              </Link>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>
                      Sign up
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}

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
            <Route path="/dashboard" element={<Dashboard />} />        

          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
export default App;
