import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layouts from "../../components/Layouts";
import Sidebar from "../../components/Sidebar";
import { getCookie, isAuth, logout } from "../../core/helpers";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

export default function ApplicantCV() {
  const token = getCookie("token");
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [resumepdf, setResumePdf] = useState("");
  const getEmployeedata = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/employer/get-applicant-cv/${params.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        setResumePdf(response.data);
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
  const getJobdata = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/employer/get-job-application-data/${params.jobid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
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
  const statusInterview = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/employer/status-interview/${params.jobid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        getEmployeedata();
        getJobdata();
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
  const statusHire = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/employer/status-hire/${params.jobid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        getEmployeedata();
        getJobdata();
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
  const statusReject = () => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/employer/status-reject/${params.jobid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response.data);
        getEmployeedata();
        getJobdata();
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
    getEmployeedata();
    getJobdata();
  }, []);
  return (
    <Layouts>
      <Sidebar></Sidebar>
      <Container className="">
        <div className="mt-5">
          {/* <h1>All Applicants</h1> */}
          <div className="d-flex">
            <br />
            <h5>Status : </h5>
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
          </div>
        </div>

        <div className="d-flex my-3">
          <Button variant="info" className="me-2" onClick={statusInterview}>
            schedule for interview
          </Button>
          <Button variant="danger" className="me-2" onClick={statusReject}>
            Reject
          </Button>
          <Button variant="success" onClick={statusHire}>
            Hire
          </Button>
        </div>
        {resumepdf !== "" ? (
          <embed
            src={`${process.env.REACT_APP_UPLOADS_URL}/employee/resumes/${resumepdf}`}
            width="800px"
            height="900px"
          />
        ) : null}
      </Container>
    </Layouts>
  );
}
