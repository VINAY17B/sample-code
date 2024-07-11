import React, { Fragment } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { isAuth, logout } from "../core/helpers";
// import { isAuth, logout } from "./helpers";
export default function Layouts({ children }) {
  const navigate = useNavigate();
  const nav = () => (
    <Navbar className="navdesign" expand="lg">
      <Container>
        <Link to={"/"}>
          <Navbar.Brand className="me-auto" href="#home">
            <p className="fs-4 m-0">
              <span className="fw-bold">Job</span>Search
            </p>
          </Navbar.Brand>
        </Link>
        <Nav className="me-0">
          <Nav.Link className="me-3">Jobs</Nav.Link>
          <Nav.Link className="me-3">For Companies</Nav.Link>
          <Nav.Link className="me-3">About</Nav.Link>
          <Nav.Link className="me-3">Contact</Nav.Link>
          <Nav.Link className="me-3">Blog</Nav.Link>
          <Nav.Link className="me-3">Login</Nav.Link>
          <Link to={`/register`}>Register</Link>
        </Nav>
      </Container>
    </Navbar>
  );
  const nav2 = () => (
    <Navbar className="navdesign" expand="lg">
      <Container>
        <Link to={"/"}>
          <Navbar.Brand className="me-auto" href="#home">
            <p className="fs-4 m-0">
              <span className="fw-bold">Job</span>Search
            </p>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link className="navitem me-5">Jobs</Nav.Link>
          <Nav.Link className="navitem me-5">For Companies</Nav.Link>
          <Nav.Link className="navitem me-5">About</Nav.Link>
          <Nav.Link className="navitem me-5">Contact</Nav.Link>
          <Nav.Link className="navitem me-5">Blog</Nav.Link>
          {isAuth() && isAuth().role === "admin" && (
            <Fragment>
              <Link to={`/admin`} className="navitem me-5">
                Dashboard
              </Link>
              <Nav.Link
                onClick={() => {
                  logout(() => {
                    navigate("/login");
                  });
                }}
                className=" text-color"
              >
                Logout
              </Nav.Link>
            </Fragment>
          )}
          {isAuth() && isAuth().role === "Employer" && (
            <Fragment>
              <Fragment>
                <Link to={`/employer`} className="navitem me-5">
                  Dashboard
                </Link>
                <Nav.Link
                  onClick={() => {
                    logout(() => {
                      navigate("/login");
                    });
                  }}
                  className=" text-color"
                >
                  Logout
                </Nav.Link>
              </Fragment>
            </Fragment>
          )}
          {isAuth() && isAuth().role === "Employee" && (
            <Fragment>
              <Fragment>
                <Link to={`/employee`} className="navitem me-5">
                  Dashboard
                </Link>
                <Nav.Link
                  onClick={() => {
                    logout(() => {
                      navigate("/login");
                    });
                  }}
                  className=" text-color"
                >
                  Logout
                </Nav.Link>
              </Fragment>
            </Fragment>
          )}
          {!isAuth() && (
            <Fragment>
              <Link to={`/login`} className="navitem me-5">
                Login
              </Link>
              <Link to={`/register`} className=" text-color">
                Register
              </Link>
            </Fragment>
          )}

          {/* <Nav.Link className=" text-color">Register</Nav.Link> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  return (
    <Fragment>
      {nav2()}
      {children}
    </Fragment>
  );
}
