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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminSkills() {
  const navigate = useNavigate();
  const [skillname, setSkillName] = useState("");
  useEffect(() => {
    getSkills();
  }, []);
  const token = getCookie("token");
  const handelchange = (e) => {
    setSkillName(e.target.value);
  };
  const [data, setData] = useState("");
  const getSkills = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/admin/get-skills`,
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

  const submitform = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/admin/add-skills`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { skill: skillname },
    })
      .then((response) => {
        console.log(response);
        setSkillName("");
        getSkills();
        toast.success("Skills Added Sucessfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        setSkillName("");
        toast.danger(err.response.data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const blockSkills = (userId) => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/admin/skills-block/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        getSkills();
        toast.success("Update Sucessful !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.danger(err.response.data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const deleteSkills = (userId) => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/admin/skills-delete/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        getSkills();
        toast.success("Deleted Sucessfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.danger(err.response.data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  return (
    <Layouts>
      <Sidebar></Sidebar>
      <Container>
        <h1>Skills</h1>
        <Row>
          <Col md={8}>
            <Table>
              <thead className="table-head">
                <tr>
                  <th>Skills</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data ? (
                  data.map((data) => {
                    return (
                      <tr className="data" key={data.id}>
                        <td>{data.skill_name} </td>
                        <td>{data.skill_isBlock ? " Blocked" : "Active"} </td>
                        <td className="d-flex justify-content-start">
                          <Button onClick={() => blockSkills(data.id)}>
                            {data.skill_isBlock === false
                              ? "Block"
                              : "Activate"}
                          </Button>
                          <Button
                            className="ms-2"
                            variant="danger"
                            onClick={() => deleteSkills(data.id)}
                          >
                            Delete
                          </Button>
                        </td>
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
            <div className="  authcard py-5">
              <Form className="" method="POST">
                <Form.Group className="mb-3" controlId="formBasicname">
                  <Form.Label>Skills Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={skillname}
                    onChange={handelchange}
                    placeholder="Enter Skills"
                  />
                </Form.Group>
                <Button variant="primary" onClick={submitform} type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
        <ToastContainer className="theToast" />
      </Container>
    </Layouts>
  );
}
