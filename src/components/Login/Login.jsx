import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/api/login", {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store token
        navigate("/dashboard/home"); // Redirect to dashboard
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <div className="login-container">
      <h2 className="text-center">Login</h2>
      <Form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
        }}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="text-start w-100">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <br />

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="text-start w-100">Password</Form.Label>
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
              marginBottom: "8px",
              alignItems: "center",
              borderRadius: "25px",
            }}
            type="submit"
          >
            Login
          </Button>
          <p className="mt-3">
            Do not have an account?
            <Button
              variant="outline-warning"
              style={{
                width: "100%",
                alignItems: "center",
                borderRadius: "25px",
                marginTop: "8px",
                color: "#000",
              }}
              onClick={() => navigate("/register")}
            >
              Signup
            </Button>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Login;
