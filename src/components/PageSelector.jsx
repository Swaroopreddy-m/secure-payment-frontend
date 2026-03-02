import { useNavigate, useSearchParams } from "react-router-dom";

const PAGE_CODES = [
  "FIRSTP",
  "FIRST1",
  "FIRST2"
];

function PageSelector() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedPage = searchParams.get("pageCode") || "";

  const handleChange = (e) => {
    const value = e.target.value;
    if (value) {
      navigate(`/dashboard/reports?pageCode=${value}`);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label><b>Select Page Code :</b></label><br />

      <select value={selectedPage} onChange={handleChange}>
        <option value="">-- Select Page --</option>

        {PAGE_CODES.map(code => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PageSelector;