
import React, { useState } from "react";
import axios from "axios";
import QRCode from "qrcode.react";
import Topbar from "../modal/welcomePageTopbar"

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mfaSecret, setMfaSecret] = useState("");
  const [showQrCode, setShowQrCode] = useState(false);




  const handleSubmit = (e) => {
    e.preventDefault();
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password)) {
      alert(
        "Password must contain at least 1 uppercase, 1 lowercase, 1 digit, 1 special character, and be at least 8 characters long"
      );
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:3001/signup", {
        email,
        password,
        mfaEnabled: false,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success && response.data.secret) {
          setMfaSecret(response.data.secret);
          setShowQrCode(true);
        } else {
          alert(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error Signup");
      });
  };

  return (
    <>
    <Topbar/>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
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
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {showQrCode && mfaSecret && (
              <div className="center-content">
                <QRCode value={mfaSecret} />
                <p>
                  Scan the QR code using your authenticator app or enter the
                  following key manually: {mfaSecret}
                </p>
              </div>
            )}

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <a href="/sign-in">Sign In?</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
