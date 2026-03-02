import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";

function Home() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload
    setError("");

    if (!userId || !password) {
      setError("User ID and Password are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { userId, password },
        { withCredentials: true } // only if using cookies
      );

      console.log("Login Success:", response.data.status);

      alert(response.data.status); // "LOGIN_SUCCESS" or "INVALID_CREDENTIALS"


       if (response.data.status === "LOGIN_SUCCESS") {
        sessionStorage.setItem("isAuthenticated", "true");
        sessionStorage.setItem("userName", userId);
        navigate("/dashboard"); {/* will found Routers in app.jsx */} // 🔥 move to main page 
      } else {
        alert("Invalid Credentials");
      }

      // Optional: store token if backend returns JWT in future
      // localStorage.setItem("token", response.data.token);

      // Later: redirect to dashboard
      // navigate("/dashboard");

    } catch (err) {
      console.error(err);

      if (err.response) {
        // Server returned an error (e.g., 401)
        setError(err.response.data.status || "Login failed");
      } else {
        // Network error or CORS issue
        setError("Network error. Check backend.");
      }
    }
  };


  const handleSignin = async (e) => {
    e.preventDefault(); // prevent page reload
    setError("");
    navigate("/signup"); {/* will found Routers in app.jsx */}
    
  }

  return (
    <div className="login-container">
      {/* LEFT BRANDING */}
      <div className="login-left">
        <h1>
          <b>P</b>ayment <b>S</b>ystem
        </h1>
        <p>Secure. Fast. Reliable.</p>
      </div>  

      {/* LOGIN CARD */}
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Please login to your account</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="divider">OR</div>

        <button className="signup-btn" onClick={handleSignin}>Sign Up</button>
      </div>
    </div>
  );
}

export default Home;
