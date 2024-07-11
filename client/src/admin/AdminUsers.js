import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Layouts from "../components/Layouts";
import Sidebar from "../components/Sidebar";
import { getCookie, isAuth, logout } from "../core/helpers";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactPaginate from "react-paginate";

export default function AdminUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
    isVerified: false,
  });
  const { name, email, password, type, isVerified } = values;
  const handelchange = (text) => (e) => {
    console.log(e.target.value);
    setValues({ ...values, [text]: e.target.value });
  };
  const token = getCookie("token");
  useEffect(() => {
    getUsers();
  }, []);
  const [data, setData] = useState("");
  const getUsers = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/admin/get-users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setData(response.data);
        setUsers(response.data);
        console.log(users);
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
  const blockUser = (userId) => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/admin/user-block/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        getUsers();
        alert("Update Sucessful");
      })
      .catch((err) => {
        console.log(err.response.data);
        alert("error", err.response.data);
      });
  };
  const userDetail = (userId) => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/admin/user-deatils/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        getUsers();
        alert("Update Sucessful");
      })
      .catch((err) => {
        console.log(err.response.data);
        alert("error", err.response.data);
      });
  };
  const deleteUser = (userId) => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/admin/user-delete/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        alert("Update Sucessful");
        getUsers();
      })
      .catch((err) => {
        console.log(err.response.data);
        alert("error", err.response.data);
      });
  };
  const submitform = (e) => {
    localStorage.removeItem("temp-register-data");
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/admin/user-add`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { name: name, email: email, password: password, role: type },
    })
      .then((response) => {
        setValues({ ...values, name: "", email: "", password: "", role: "" });
        alert("User Added Sucessful");
        getUsers();
      })
      .catch((err) => {
        console.log(err.response.data);
        setValues({ ...values, name: "", email: "", password: "", role: "" });
        alert(err.response.data.error);
      });
  };
  const [pageNumber, setPageNumber] = useState(0);
  const [pages] = useState(10);

  const pagesVisited = pageNumber * pages;

  const pageCount = Math.ceil(users.length / pages);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <Layouts>
      <Sidebar></Sidebar>
      <Container>
        <h1>Users</h1>
        <Row>
          <Col md={8} sm={12}>
            <Table responsive="md">
              <thead className="table-head">
                <tr>
                  <th>Users</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data ? (
                  data.slice(pagesVisited, pagesVisited + pages).map((data) => {
                    if (data.email !== isAuth().email) {
                      return (
                        <tr className="data" key={data.id}>
                          <td>{data.name} </td>
                          <td>{data.email} </td>
                          <td>{data.role} </td>
                          <td>{data.block_user ? " Blocked" : "Active"} </td>
                          <td className="d-flex justify-content-between">
                            <Button onClick={() => blockUser(data.id)}>
                              {data.block_user === false ? "Block" : "Activate"}
                            </Button>
                            <Link to={data.id}>
                              <Button variant="warning">Update</Button>
                            </Link>

                            <Button
                              variant="danger"
                              onClick={() => deleteUser(data.id)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    }
                  })
                ) : (
                  <tr>
                    <td>No data yet </td>
                  </tr>
                )}
              </tbody>
            </Table>
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </Col>
          <Col md={4}>
            <div className="  authcard py-5">
              <h3 className="my-3">Add users</h3>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
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

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={handelchange("password")}
                    placeholder="Password"
                  />
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
                  <Form.Check
                    inline
                    label="Admin"
                    name="userType"
                    value="admin"
                    onChange={handelchange("type")}
                    type={"radio"}
                    id={`inline-radio-3`}
                  />
                </div>
                <Button
                  className="btn mt-2"
                  size="lg"
                  onClick={submitform}
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </Layouts>
  );
}
