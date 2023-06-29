import React from "react";
import { useState } from "react";
import axios from "axios"

export default function Login()  {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/login", { email, password })
      .then((response) => {
        console.log(response.data);

        if (response.data.token) {
          const { token } = response.data;
          alert("Login successful");
          window.localStorage.setItem("token", token);
          window.localStorage.setItem("loggedIn", true);
          window.location.href = "./dashboard";
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error signing in");
      });
  };

    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Sign In</h3>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right">
              Forgot <a href="/forgot-password">password?</a>
            </p>
          </form>
        </div>
      </div>
    );
  
}
