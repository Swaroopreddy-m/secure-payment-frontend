import { NavLink } from "react-router-dom";

function Tabs() {
  return (
    <nav className="dashboard-tabs">
      <NavLink to="employees">Employees</NavLink>
      <NavLink to="add">Add Employee</NavLink>
      <NavLink to="reports">Reports</NavLink>
    </nav>
  );
}

export default Tabs;
