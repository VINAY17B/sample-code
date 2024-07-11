import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Link, useNavigate } from "react-router-dom";
import Layouts from "../../components/Layouts";
import Sidebar from "../../components/Sidebar";
import { getCookie, isAuth, logout } from "../../core/helpers";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";

export default function Applicants() {
  const token = getCookie("token");
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const getJobdata = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/employer/get-applicants/${
        isAuth().email
      }`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(" asdasdasd", response.data);
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
  useEffect(() => {
    getJobdata();
  }, []);
  return (
    <Layouts>
      <Sidebar></Sidebar>
      <Container>
        <h1>All Applicants</h1>
        <Table className="mt-3">
          <thead className="table-head">
            <tr>
              <th>Job Title</th>
              <th>Applicant</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data.map((data) => {
                return (
                  <tr className="data" key={data.id}>
                    <td>{data.app_job_title} </td>
                    <td>{data.employee_email} </td>
                    <td>
                      <Badge
                        bg={
                          data.status === 0
                            ? "primary"
                            : data.status === 1
                            ? "primary"
                            : data.status === 2
                            ? "success"
                            : "danger"
                        }
                      >
                        {data.status === 0
                          ? "Processing"
                          : data.status === 1
                          ? "Scheduled For interview"
                          : data.status === 2
                          ? "Accepted"
                          : "Rejected"}
                      </Badge>
                    </td>
                    <td>
                      <Link
                        to={`/employer/applicant/${data.id}/${data.employee_email}`}
                        target="_blank"
                      >
                        <Button>View CV</Button>
                      </Link>
                    </td>
                    <td className="d-flex justify-content-start"></td>
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
      </Container>
    </Layouts>
  );
}
