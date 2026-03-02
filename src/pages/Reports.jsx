import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PageSelector from "../components/PageSelector";

function Reports() {
  const [searchParams] = useSearchParams();
  const pageCode = searchParams.get("pageCode");
  const [records, setRecords] = useState([]); // renamed for clarity

  useEffect(() => {
    if (pageCode) {
      axios
        .post(`http://localhost:8080/api/pages/${pageCode}`)
        .then(res => {
          // Assuming backend returns an array of objects like
          // [{fname:'', l_name:'', customer_id:'', cin:'', card_no:''}, ...]
          setRecords(res.data || []);
        })
        .catch(console.error);
    }
  }, [pageCode]);

  return (
    <div style={{ padding: "20px" }}>
      <PageSelector />

      {!pageCode && <p>Please select a page</p>}

      {pageCode && records.length > 0 && (
        <>
          <h3>Page : {pageCode}</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>First Name</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Last Name</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Customer ID</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>CIN</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Card No</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{rec.fname}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{rec.l_name}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{rec.customer_id}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{rec.cin}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{rec.card_no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {pageCode && records.length === 0 && <p>No records found</p>}
    </div>
  );
}

export default Reports;