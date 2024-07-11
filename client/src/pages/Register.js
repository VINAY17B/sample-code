import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Layouts from "../components/Layouts";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { isAuth } from "../core/helpers";
import { Navigate, useNavigate } from "react-router-dom";
import { validation } from "../core/validations";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
    isVerified: false,
  });
  const [errors, setErrors] = useState({
    nameerror: "",
    emailerror: "",
    passworderror: "",
  });
  const { nameerror, emailerror, passworderror } = errors;
  const dispatch = useDispatch();
  const employers = useSelector((state) => state.employer);
  const { name, email, password, type, isVerified } = values;
  const handelchange = (text) => (e) => {
    console.log(e.target.value);
    setValues({ ...values, [text]: e.target.value });
    setErrors({
      ...errors,
      [text + "error"]: validation(text, e.target.value),
    });
  };
  const onCaptchaValidated = (value) => {
    setValues({ ...values, isVerified: true });
  };
  useEffect(() => {
    const formData = window.localStorage.getItem("temp-register-data");
    const theData = JSON.parse(formData);
    setValues(theData);
    // setValues({ ...values, isVerified: false });
  }, []);
  useEffect(() => {
    window.localStorage.setItem("temp-register-data", JSON.stringify(values));
  });
  const submitform = (e) => {
    localStorage.removeItem("temp-register-data");
    e.preventDefault();

    //  else {
    //   dispatch({
    //     type: "REGISTER - Employee",
    //     payload: {
    //       id: new Date().getTime(),
    //       name,
    //       email,
    //       password,
    //     },
    //   });
    // }
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/signup`,
      data: { name: name, email: email, password: password, role: type },
    })
      .then((response) => {
        setValues({ ...values, name: "", email: "", password: "", role: "" });
        alert("Registration Sucessful");
        console.log("sdfssfd", isAuth());
        isAuth() && isAuth().role === "admin"
          ? navigate("/admin")
          : isAuth() && isAuth().role === "Employer"
          ? navigate("/employer")
          : navigate("/student");
      })
      .catch((err) => {
        console.log(err.response.data);
        setValues({ ...values, name: "", email: "", password: "", role: "" });
        alert(err.response.data.error);
      });
  };
  return (
    <Layouts>
      {/* {employers.map((emp) => (
        <div key={emp.id}> {emp.name}</div>
      ))} */}
      <Container className="d-flex justify-content-center">
        <div className=" mt-5 authcard py-5">
          <h3 className="my-3">Register</h3>
          <Form>
            {isAuth() ? <Navigate to="/" /> : null}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={handelchange("name")}
                placeholder="Enter Name"
              />
              <Form.Text className="text-danger">{nameerror}</Form.Text>
            </Form.Group>
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

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={handelchange("password")}
                placeholder="Password"
              />
              <Form.Text className="text-danger">{passworderror}</Form.Text>
            </Form.Group>
            <div className="mb-3">
              <Form.Check
                inline
                label="Employer"
                name="userType"
                value="Employer"
                onChange={handelchange("type")}
                type={"radio"}
                id={`inline-radio-1`}
              />
              <Form.Check
                inline
                label="Employee"
                name="userType"
                value="Employee"
                onChange={handelchange("type")}
                type={"radio"}
                id={`inline-radio-2`}
              />
            </div>
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={onCaptchaValidated}
            />
            <Button
              className="btn mt-2"
              size="lg"
              disabled={!isVerified}
              onClick={submitform}
              type="submit"
            >
              Register
            </Button>
          </Form>
        </div>
      </Container>
    </Layouts>
  );
}
