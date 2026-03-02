import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Welcome from "./pages/Welcome";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import Reports from "./pages/Reports";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./App.css";

function App() {
  // 🔹 Dynamic basename: / for localhost, /react-employee-management for production
  const basename =
    import.meta.env.MODE === "production"
      ? "/react-employee-management"
      : "/";

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* 👇 CHILD ROUTES */}
          <Route index element={<Welcome />} />
          <Route path="employees" element={<Employees />} />
          <Route path="add" element={<AddEmployee />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;