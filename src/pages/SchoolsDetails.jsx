import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

const SchoolsDetails = () => {
  const { region } = useParams(); // Get the region from URL parameters
  const [schools, setSchools] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSchoolsByRegion(region);
  }, [region]);

  const fetchSchoolsByRegion = async (region) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/schools/region/${region}`
      );
      setSchools(response.data);
    } catch (error) {
      console.error(`Error fetching schools for region ${region}:`, error);
    }
  };

  const handleBack = () => {
    navigate("/dashboard/home");
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center mb-4">
        {region.toUpperCase()} Region Schools
      </h2>
      <div className="black"></div>
      <div className="yellow"></div>
      <div className="red"></div>
      <br />
      <Button variant="outline-dark" className="mb-3" onClick={handleBack}>
        Back
      </Button>
      <div className="table">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>School Name</th>
              <th>Level</th>
              <th>District</th>
              <th>Enrollment</th>
            </tr>
          </thead>
          <tbody>
            {schools.length > 0 ? (
              schools.map((school) => (
                <tr key={school.id}>
                  <td>{school.school_name}</td>
                  <td>{school.level}</td>
                  <td>{school.district}</td>
                  <td>{school.enrollment_number}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No schools found for this region
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default SchoolsDetails;
