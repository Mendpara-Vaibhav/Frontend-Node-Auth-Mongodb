import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "./UserApi";
import { toast } from "react-toastify";
import { Container, Form, Button, Card, FloatingLabel } from "react-bootstrap";

const Login = () => {
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin/product");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userLogin(info);
      localStorage.setItem("token", res.data.accessToken);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingUsername"
            label="Username"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Username"
              required
              onChange={(e) => setInfo({ ...info, username: e.target.value })}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-4"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setInfo({ ...info, password: e.target.value })}
            />
          </FloatingLabel>

          <Button variant="success" type="submit" className="w-100">
            Login
          </Button>

          <h6 className="mt-3 text-center">
            Don't have an account? <Link to="/register">Register</Link>
          </h6>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
