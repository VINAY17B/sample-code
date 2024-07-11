import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Layouts from "../components/Layouts";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { authenticate, isAuth } from "../core/helpers";
import axios from "axios";
import { validation } from "../core/validations";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
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

  useEffect(() => {
    window.localStorage.setItem("temp-login-data", JSON.stringify(values));
  });
  useEffect(() => {
    const formData = window.localStorage.getItem("temp-login-data");
    const theData = JSON.parse(formData);
    // const checkdata = formData.every((key) => {
    //   if (key !== [undefined, null]) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
    // console.log(checkdata)

    setValues(theData);
  }, []);
  const submitform = (e) => {
    e.preventDefault();
    localStorage.removeItem("temp-login-data");
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/signin`,
      data: { email, password },
    })
      .then((response) => {
        console.log(response);
        authenticate(response, () => {
          console.log("hekek")
          setValues({ ...values, email: "", password: "" });

          toast.success("Login Sucessful!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          isAuth() && isAuth().role === "admin"
            ? navigate("/admin")
            : isAuth() && isAuth().role === "Employer"
              ? navigate("/employer")
              : navigate("/employee");
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        setValues({ ...values, email: "", password: "" });
        toast.error(err.response.data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  return (
    <Layouts>
      <Container className="d-flex justify-content-center   align-items-center">
        <div className=" mt-5 authcard py-5">
          <h3 className="my-3">Login</h3>
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
            <div className="d-flex justify-content-between align-items-start">
              <Button
                className="btn mt-2"
                size="lg"
                onClick={submitform}
                type="submit"
              >
                Login
              </Button>
              <Link
                className="text-primary text-decoration-underline"
                to={"/forgot-password"}
              >
                Forgot password?
              </Link>
            </div>
          </Form>
        </div>
        <ToastContainer className="theToast" />
      </Container>
    </Layouts>
  );
}
