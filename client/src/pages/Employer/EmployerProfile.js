import axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";
import Layouts from "../../components/Layouts";
import Sidebar from "../../components/Sidebar";
import { getCookie, isAuth, logout } from "../../core/helpers";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

export default function EmployerProfile() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    cname: "",
    email: "",
    type: "",
    domain: "",
    number: "",
    location: "",
    photo: "",
    recruiter: false,
    isVerified: false,
  });
  const {
    name,
    email,
    recruiter,
    photo,
    cname,
    type,
    location,
    number,
    domain,
    isVerified,
  } = values;
  const token = getCookie("token");
  const getEmployersDetails = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/employers/${isAuth().email}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        const {
          employer_name,
          employer_company_name,
          employer_domain,
          employer_mobile,
          employer_email,
          employer_location,
          employer_recruiter,
          employer_logo,
        } = response.data;
        setValues({
          ...values,
          name: employer_name,
          cname: employer_company_name,
          domain: employer_domain,
          number: employer_mobile,
          email: employer_email,
          location: employer_location,
          recruiter: employer_recruiter,
          photo: employer_logo,
        });
      })
      .catch((err) => {
        console.log(err.response.data.error);
        if (err.response.status === 401) {
          logout(() => {
            navigate("/");
          });
        }
      });
  };
  useEffect(() => {
    getEmployersDetails();
  }, []);

  return (
    <Layouts>
      <Sidebar></Sidebar>
      <Container className="d-flex justify-content-center ">
        <div className="card-lg">
          <h1> Profile</h1>
          <Row>
            <Col md={6} sm={12} className="d-flex justify-content-center">
              <div className="profile-lg ">
                <Image
                  src={`${process.env.REACT_APP_UPLOADS_URL}/employer/${photo}`}
                  roundedCircle
                  rounded
                  fluid
                />
              </div>
            </Col>
            <Col md={6} sm={12}>
              Company username : {cname}
              <br />
              Employer : {name}
              <br />
              Email : {email}
              <br />
              Location : {location}
              <br />
              Phone : {number}
              <br />
              Domain : {domain}
            </Col>
          </Row>
        </div>
      </Container>
    </Layouts>
  );
}
