import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Layouts from "../../components/Layouts";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navigate, useNavigate } from "react-router-dom";
import { getCookie, isAuth } from "../../core/helpers";
import axios from "axios";
import { validation } from "../../core/validations";

export default function ResetPassword() {
  const navigate = useNavigate();
  const token = getCookie("token");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailerror: "",
    passworderror: "",
  });
  const { emailerror, passworderror } = errors;
  const { email, password } = values;
  const handelchange = (text) => (e) => {
    setValues({ ...values, [text]: e.target.value });
    setErrors({
      ...errors,
      [text + "error"]: validation(text, e.target.value),
    });
  };

  const submitform = (e) => {
    e.preventDefault();
    console.log(token);
    localStorage.removeItem("temp-login-data");
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/reset-password`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { email, password },
    })
      .then((response) => {
        console.log(response);
        alert("Password Changed Sucessfully");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data);
        setValues({ ...values, email: "", password: "" });
        alert(err.response.data.error);
        navigate("/login");
      });
  };
  return (
    <Layouts>
      <Container className="d-flex justify-content-center   align-items-center">
        <div className=" mt-5 authcard py-5">
          <h3 className="my-3">Reset Password</h3>
          {isAuth() ? <Navigate to="/" /> : null}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={handelchange("email")}
                autocomplete="false"
                placeholder="Enter email"
              />
              <Form.Text className="text-danger">{emailerror}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                autocomplete="false"
                onChange={handelchange("password")}
                placeholder="Password"
              />
              <Form.Text className="text-danger">{passworderror}</Form.Text>
            </Form.Group>
            <div className="d-flex justify-content-between align-items-start">
              <Button
                className="btn mt-2"
                size="lg"
                onClick={submitform}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </Layouts>
  );
}
