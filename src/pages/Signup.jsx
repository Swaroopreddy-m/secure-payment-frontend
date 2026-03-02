import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css";

function Signup() {
  const [userName, setUserName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userDob, setUserDob] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [systemIp, setSystemIp] = useState("");
  const [registeredDate] = useState(new Date().toISOString());
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://api.ipify.org?format=json")
      .then(res => setSystemIp(res.data.ip))
      .catch(() => setSystemIp("127.0.0.1"));
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!userName || !userMobile || !userDob || !userMail) {
      setError("All required fields must be filled");
      return;
    }

    if (userMobile.length !== 10) {
      setError("Mobile number must be 10 digits");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/auth/signup", {
        user_name: userName,
        user_mobile: userMobile,
        user_dob: userDob,
        user_mail: userMail,
        user_phone: userPhone,
        system_ip: systemIp,
        registered_date: registeredDate
      });

      alert("Customer registered successfully.");
      navigate("/");

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Signup failed");
      } else {
        setError("Network error. Check backend.");
      }
    }
  };

  return (
    <div className="signup-page">
      <header className="signup-header">
        <h1>
          <span>P</span>ayment <span>S</span>ystem
        </h1>
        <p>Create your account</p>
      </header>

      <div className="signup-container">
        <div className="signup-card">
          <h2>Create Account</h2>

          {error && <p className="error-text">{error}</p>}

          <form onSubmit={handleSignup} className="signup-form-grid">

            {/* Left Column */}
            <input
              type="text"
              placeholder="Full Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Mobile Number"
              maxLength="10"
              value={userMobile}
              onChange={(e) =>
                setUserMobile(e.target.value.replace(/\D/g, ""))
              }
            />

            <input
              type="date"
              value={userDob}
              onChange={(e) => setUserDob(e.target.value)}
            />

            {/* Right Column */}
            <input
              type="email"
              placeholder="Email"
              value={userMail}
              onChange={(e) => setUserMail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Phone"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
            />

            <input
              type="text"
              value={systemIp}
              readOnly
              placeholder="System IP"
            />

            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>

          <p className="login-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;