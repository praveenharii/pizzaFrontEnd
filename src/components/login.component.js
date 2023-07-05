
import React from "react";
import { useState } from "react";
import axios from "axios"
import Topbar from "../modal/welcomePageTopbar"
import env from "react-dotenv";

export default function Login()  {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [mfaToken, setMFACode] = useState("");
  const [showOTPField, setShowOTPField] = useState(false);
  const [otp, setOTP] = useState("");
  const hash = localStorage.getItem("HASH");

  

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${env.APP_API_PORT}/login`, { email, password, hash, otp })
      .then((response) => {
        console.log(response.data);

        if (response.status === 200) {
          const { token } = response.data;
          alert("Login successful");
          localStorage.setItem("token", token);
          localStorage.setItem("loggedIn", true);
          window.location.href = "./dashboard";
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response) {
          const { data, status } = error.response;
          console.log(data);
          console.log(status);
          alert("Error signing in: " + data.message);
        } else if (error.request) {
          console.log(error.request);
          alert("Please Verify your email");
        } else {
          console.log("Error", error.message);
          alert("Error signing in: " + error.message);
        }
      });
  };


  const verifyEmail = (e) => {
    e.preventDefault();

    axios
      .post(`${env.APP_API_PORT}/get-otp`, { email })
      .then((response) => {
        const { data } = response.data;
        console.log(response.data);
        if (response.data.message === "Success") {
          console.log(response.data.data);
          localStorage.setItem("HASH", data);
          setShowOTPField(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

    // const verifyOTP = (e) => {
    //   e.preventDefault();
    //   console.log(hash);
    //   axios
    //     .post("http://localhost:3001/verify-otp", { otp, hash, email })
    //     .then((response) => {
    //       console.log(response.data);
          
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // };

    return (
      <>
        <Topbar />

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
              <div className="d-grid row justify-content-md-center">
                <button onClick={verifyEmail} className="btn btn-primary">
                  Send OTP
                </button>
              </div>
              {showOTPField && (
                <div className="mb-3 ">
                  <label>Enter OTP</label>
                  <input
                    type="otp"
                    className="form-control"
                    placeholder="Enter OTP"
                    onChange={(e) => setOTP(e.target.value)}
                  />
                </div>
              )}
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
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <div className="d-grid row justify-content-md-center">
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
      </>
    );
  
}


    
//       /* <div className="mb-3">
//                 <label>Enter MFA code</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   placeholder="Enter Code"
//                   onChange={(e) => setMFACode(e.target.value)}
//                 />
//               </div> */
    

