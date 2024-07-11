import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Layouts from "../../components/Layouts";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navigate, useNavigate } from "react-router-dom";
import { isAuth } from "../../core/helpers";
import axios from "axios";
import { validation } from "../../core/validations";

export default function Email() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    emailerror: "",
  });
  const { emailerror } = errors;
  const { email } = values;
  const handelchange = (text) => (e) => {
    setValues({ ...values, [text]: e.target.value });
    setErrors({
      ...errors,
      [text + "error"]: validation(text, e.target.value),
    });
  };
  const submitform = (e) => {
    e.preventDefault();
    localStorage.removeItem("temp-login-data");
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/forgot-password`,
      data: { email },
    })
      .then((response) => {
        alert(response.data.message);
        navigate(`/otp-verification/${response.data.user}`);
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data.error);
        navigate("/login");
      });
  };
  return (
    <Layouts>
      <Container className="d-flex justify-content-center   align-items-center">
        <div className=" mt-5 authcard py-5">
          <h3 className="my-3">Forgot Password</h3>
          {isAuth() ? <Navigate to="/" /> : null}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={handelchange("email")}
                placeholder="Enter email"
              />
              <Form.Text className="text-danger">{emailerror}</Form.Text>
            </Form.Group>
            <Button
              className="btn mt-2"
              size="lg"
              onClick={submitform}
              type="submit"
            >
              Send OTP
            </Button>
          </Form>
        </div>
      </Container>
    </Layouts>
  );
}
