import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Layouts from "../components/Layouts";
import Sidebar from "../components/Sidebar";
import { getCookie, logout } from "../core/helpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function AdminType() {
  const navigate = useNavigate();
  const [typename, setTypeName] = useState("");
  useEffect(() => {
    getCategory();
  }, []);
  const token = getCookie("token");
  const handelchange = (e) => {
    setTypeName(e.target.value);
  };
  const [data, setData] = useState("");
  const getCategory = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/admin/get-type`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setData(response.data);
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
  // const tabledata = records.map((category) => {
  //   <tr>
  //     <td>1</td>
  //     <td>{category.id}</td>
  //     <td>{category.cat_name}</td>
  //   </tr>;
  // });
  const submitform = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/admin/add-type`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { type: typename },
    })
      .then((response) => {
        console.log(response);
        setTypeName("");
        alert("Type Added Sucessful");
        getCategory();
      })
      .catch((err) => {
        console.log(err.response.data);
        setTypeName("");
        alert(err.response.data.error);
      });
  };
  return (
    <Layouts>
      <Sidebar></Sidebar>
      <Container>
        <Row>
          <Col md={8}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Type Name</th>
                </tr>
              </thead>
              <tbody>
                {data ? (
                  data.map((data) => {
                    return (
                      <tr className="data" key={data.id}>
                        <td>{data.type_name} </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>No data yet </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
          <Col md={4}>
            <Form className="" method="POST">
              <Form.Group className="mb-3" controlId="formBasicname">
                <Form.Label>Type Name</Form.Label>
                <Form.Control
                  type="text"
                  value={typename}
                  onChange={handelchange}
                  placeholder="Enter Type"
                />
              </Form.Group>
              <Button variant="primary" onClick={submitform} type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layouts>
  );
}
