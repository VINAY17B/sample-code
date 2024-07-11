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

export default function AdminPerks() {
  const navigate = useNavigate();
  const [perksname, setPerksName] = useState("");
  useEffect(() => {
    getSkills();
  }, []);
  const token = getCookie("token");
  const handelchange = (e) => {
    setPerksName(e.target.value);
  };
  const [data, setData] = useState("");
  const getSkills = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/admin/get-perks`,
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
      url: `${process.env.REACT_APP_URL}/admin/add-perks`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { perks: perksname },
    })
      .then((response) => {
        console.log(response);
        setPerksName("");
        getSkills();
        toast.success("Perks Added Sucessfully !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        setPerksName("");
        toast.danger(err.response.data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const blockPerks = (userId) => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/admin/perks-block/${userId}`,
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
  const deletePerks = (userId) => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/admin/perks-delete/${userId}`,
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
        <h1>Perks</h1>
        <Row>
          <Col md={8}>
            <Table>
              <thead className="table-head">
                <tr>
                  <th>Perks</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data ? (
                  data.map((data) => {
                    return (
                      <tr className="data" key={data.id}>
                        <td>{data.perks_name} </td>
                        <td>{data.perks_isBlock ? " Blocked" : "Active"} </td>
                        <td className="d-flex justify-content-start">
                          <Button onClick={() => blockPerks(data.id)}>
                            {data.perks_isBlock === false
                              ? "Block"
                              : "Activate"}
                          </Button>
                          <Button
                            className="ms-2"
                            variant="danger"
                            onClick={() => deletePerks(data.id)}
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
                  <Form.Label>Perks Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={perksname}
                    onChange={handelchange}
                    placeholder="Enter Perks"
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
