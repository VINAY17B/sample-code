import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCookie, logout } from "../core/helpers";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Layouts from "../components/Layouts";
import Sidebar from "../components/Sidebar";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function AdminUserDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });
  const { id, name, email, role } = values;
  const token = getCookie("token");
  const getUser = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/admin/user-detail/${params.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        const { id, name, email, role } = response.data;
        setValues({
          ...values,
          id: id,
          name: name,
          email: email,
          role: role,
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
  const handelchange = (text) => (e) => {
    setValues({ ...values, [text]: e.target.value });
  };
  const updateform = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/admin/user-update/${params.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { id, name, email, role },
    })
      .then((response) => {
        console.log(response);

        alert("Update Sucessful");
        navigate("/admin/users");
      })
      .catch((err) => {
        console.log(err.response.data);
        alert("error", err.response.data);
      });
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Layouts>
      <Sidebar></Sidebar>
      <Container>
        <div>
          <Row>
            <Col md={6} sm={12}>
              <Form className="form-my-style" method="POST">
                <Form.Group className="mb-3" controlId="formBasicname">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={handelchange("name")}
                    placeholder="Enter Name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={handelchange("email")}
                    placeholder="Enter email"
                  />
                </Form.Group>
                <Button variant="primary" onClick={updateform} type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
            <Col md={6} sm={12}>
              <br />
              Name : {name}
              <br />
              Email : {email}
              <br />
              Role : {role}
            </Col>
          </Row>
        </div>
      </Container>
    </Layouts>
  );
}
