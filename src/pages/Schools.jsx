import { useEffect, useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSchool, setEditingSchool] = useState(null);

  // Form fields
  const [schoolName, setSchoolName] = useState("");
  const [level, setLevel] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [enrollment, setEnrollment] = useState("");

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/schools");
      setSchools(response.data);
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingSchool) {
        // Update existing school
        await axios.put(
          `http://localhost:8081/api/schools/update/${editingSchool.id}`,
          {
            school_name: schoolName,
            level,
            region,
            district,
            enrollment_number: enrollment,
          }
        );
      } else {
        // Add new school
        await axios.post("http://localhost:8081/api/schools/add", {
          school_name: schoolName,
          level,
          region,
          district,
          enrollment_number: enrollment,
        });
      }

      // Reset form and close modal
      resetForm();
      fetchSchools();
    } catch (error) {
      console.error("Error saving school:", error);
    }
  };

  const handleEdit = (school) => {
    setEditingSchool(school);
    setSchoolName(school.school_name);
    setLevel(school.level);
    setRegion(school.region);
    setDistrict(school.district);
    setEnrollment(school.enrollment_number);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this school?")) {
      try {
        await axios.delete(`http://localhost:8081/api/schools/delete/${id}`);
        fetchSchools();
      } catch (error) {
        console.error("Error deleting school:", error);
      }
    }
  };

  const resetForm = () => {
    setEditingSchool(null);
    setSchoolName("");
    setLevel("");
    setRegion("");
    setDistrict("");
    setEnrollment("");
    setShowModal(false);
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center mb-4">Schools Management System</h2>
      <div className="black"></div>
      <div className="yellow"></div>
      <div className="red"></div>
      <br />

      {/* Add School Button */}
      <Button
        variant="success"
        onClick={() => setShowModal(true)}
        className="mb-3"
      >
        Add School
      </Button>

      {/* Modal for Adding/Editing Schools */}
      <Modal
        show={showModal}
        onHide={resetForm}
        backdrop="static"
        keyboard={false}
        className=".custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editingSchool ? "Edit School" : "Add New School"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="schoolName">
              <Form.Label>School Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter school name"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="level">
              <Form.Label>Level</Form.Label>
              <Form.Select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                required
              >
                <option value="">Select Level</option>
                <option value="preprimary">Preprimary</option>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="region">
              <Form.Label>Region</Form.Label>
              <Form.Select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
              >
                <option value="">Select Region</option>
                <option value="central">Central</option>
                <option value="north">North</option>
                <option value="east">East</option>
                <option value="west">West</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="district">
              <Form.Label>District</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="enrollment">
              <Form.Label>Enrollment Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter enrollment number"
                value={enrollment}
                onChange={(e) => setEnrollment(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              className="mt-3"
              style={{ width: "100%" }}
            >
              {editingSchool ? "Update School" : "Add School"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Schools Table */}
      <div className="table">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>School Name</th>
              <th>Level</th>
              <th>Region</th>
              <th>District</th>
              <th>Enrollment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schools.length > 0 ? (
              schools.map((school) => (
                <tr key={school.id}>
                  <td>{school.id}</td>
                  <td>{school.school_name}</td>
                  <td>{school.level}</td>
                  <td>{school.region}</td>
                  <td>{school.district}</td>
                  <td>{school.enrollment_number}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(school)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(school.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No schools found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Schools;
