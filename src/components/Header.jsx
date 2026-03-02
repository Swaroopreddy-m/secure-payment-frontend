import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔥 Clear everything
    localStorage.clear();
    sessionStorage.clear();

    // 🔐 Prevent back navigation
    window.history.pushState(null, "", "/");
    
    // 🚀 Redirect to login
    navigate("/", { replace: true });

    // Optional hard reload
    window.location.reload();
  };

  return (
    <header className="dashboard-header">
      <h2>Secure Payment System</h2>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default Header;
