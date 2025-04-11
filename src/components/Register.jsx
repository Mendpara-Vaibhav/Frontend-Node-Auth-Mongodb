import React, { useState } from "react";
import { userRegister } from "./UserApi";
import { toast } from "react-toastify";
import { Container, Form, Button, Card, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userRegister(user);
      toast.success("Registered successfully! Now login.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed.");
    }
    setUser({ username: "", email: "", password: "" });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card
        className="p-4 shadow bg-body-tertiary"
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <h3 className="text-center mb-4">Register</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Choose a username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              placeholder="Enter your email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                required
                placeholder="Create a password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <Button
                variant="warning"
                onClick={() => setShowPassword((prev) => !prev)}
                type="button"
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputGroup>
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            Register
          </Button>

          <h6 className="mt-3 text-center">
            Already have an account? <Link to="/login">Login</Link>
          </h6>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
