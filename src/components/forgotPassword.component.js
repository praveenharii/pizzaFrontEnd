

import React from "react";
import { useState } from "react";
import Axios from "axios";
import env from "react-dotenv";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  

  const handleSubmit = (e) => {
   e.preventDefault();
    Axios.post(`${env.APP_API_PORT}/forgotPassword`, { email })
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        setMessage("Error");
      });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Reset Password</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
          <p>{message}</p>
        </form>
      </div>
    </div>
  );
}
