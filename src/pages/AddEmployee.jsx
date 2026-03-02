import { useState } from "react";
import axios from "axios";
import "../styles/AddEmployee.css";

function AddEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!name || !email || !department || !salary) {
      setMessage("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/employees",
        {
          name,
          email,
          department,
          salary: parseFloat(salary)
        },
        {
          auth: { username: "admin", password: "admin123" }, // Basic Auth
        }
      );

      setMessage("Employee added successfully ✅");
      setName("");
      setEmail("");
      setDepartment("");
      setSalary("");
    } catch (err) {
      console.error(err);
      setMessage("Failed to add employee ❌");
    }
  };

  return (
    <div className="add-employee-container">
      <h3>Add Employee</h3>

      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit} className="add-employee-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <button type="submit" className="add-btn">
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
