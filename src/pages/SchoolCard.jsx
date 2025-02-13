import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";

const SchoolCard = () => {
  const [regionData, setRegionData] = useState([]);

  useEffect(() => {
    fetchRegionCounts();
  }, []);

  const fetchRegionCounts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/schools/countByRegion"
      );
      setRegionData(response.data);
    } catch (error) {
      console.error("Error fetching region counts:", error);
    }
  };

  return (
    <div className="container mt-3">
      <h4 className="text-left mb-3">Schools by Region</h4>
      <Row>
        {regionData.map((region, index) => (
          <Col key={index} md={3} sm={6} className="mb-3">
            <Card className="custom-card">
              <Card.Body>
                <div className="d-flex justify-content-center align-items-center">
                  <FaBuilding className="card-icon" />
                  <Card.Title>{region.region.toUpperCase()}</Card.Title>
                </div>
                <Card.Text>
                  <strong>{region.count}</strong> Schools
                </Card.Text>
                <Link
                  to={`/dashboard/schools/${region.region}`}
                  className="btn-primary"
                >
                  View Details
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SchoolCard;
