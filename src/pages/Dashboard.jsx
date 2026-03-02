import Header from "../components/Header";
import Tabs from "../components/Tabs";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import "../styles/Dashboard.css";


function Dashboard() {
  return (
    <div className="dashboard-container">
      <Header />
      <Tabs />

      {/* Dynamic content */}
      <div className="dashboard-content">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
