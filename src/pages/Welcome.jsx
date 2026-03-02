import { useEffect, useState } from "react";
import '../styles/Welcome.css';

function Welcome() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // 1️⃣ Fetch username from storage (you can set it at login)
    const storedUser = sessionStorage.getItem("userName") || "Customer";
    setUserName(storedUser);

    // 2️⃣ Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="welcome-container">
      <h2>Welcome, {userName}</h2>
      <p>Current time: {currentTime.toLocaleTimeString()}</p>
    </div>
  );
}

export default Welcome;
