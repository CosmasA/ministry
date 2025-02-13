import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { firstname, lastname, email, password };

    try {
      const response = await fetch("http://localhost:8081/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setMessage("User registered successfully!");
        setTimeout(() => navigate("/"), 2000);
        console.log(response);
      } else {
        const data = await response.json();
        setMessage(data.message || "An error occurred");
      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="text-center">Register</h2>
      {message && <p className="text-center">{message}</p>}
      <Form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
        }}
      >
        <Form.Group controlId="formBasicFirstname">
          <Form.Label className="text-start w-100">Firstname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicLastname">
          <Form.Label className="text-start w-100 mt-3">Lastname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label className="text-start w-100 mt-3">
            Email address
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="text-start w-100 mt-3">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <div className="text-center mt-3">
          <Button
            variant="primary"
            style={{
              border: "none",
              width: "100%",
              marginTop: "8px",
              alignItems: "center",
              borderRadius: "25px",
            }}
            type="submit"
          >
            Signup
          </Button>
          <p className="mt-3">
            Have an account already?
            <Button
              variant="outline-warning"
              style={{
                width: "100%",
                marginTop: "8px",
                alignItems: "center",
                marginBottom: "8px",
                borderRadius: "25px",
                color: "#000",
              }}
              onClick={() => navigate("/")}
            >
              Login
            </Button>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
