import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Layouts from "../../components/Layouts";
import Sidebar from "../../components/Sidebar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie, isAuth, logout } from "../../core/helpers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import * as AIicons from "react-icons/ai";

export default function EmployerMyjobs() {
  const navigate = useNavigate();
  const token = getCookie("token");
  const [jobs, setJobs] = useState("");
  const [company, setCompany] = useState("");
  const getALlJobs = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/employers/get-allJobs/${
        isAuth().email
      }`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("JOBS : ", response.data.jobs);
        console.log("Comapny : ", response.data.company);
        setJobs(response.data.jobs);
        setCompany(response.data.company);
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

  const deleteJob = (jobid) => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/employers/delete-job/${jobid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        getALlJobs();
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

  const jobStatus = (jobid) => {
    console.log("job");
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/employers/publish-job/${jobid}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        getALlJobs();
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
    getALlJobs();
  }, []);
  return (
    <Layouts>
      <Container className="my-5">
        <h1>Jobs Posted</h1>
      </Container>
      <div className=" white-background">
        <Container className="white-background py-5">
          <Row>
            {jobs
              ? jobs?.map((job) => {
                  return (
                    <Col md={6} sm={12} key={job.id}>
                      <Card border="primary" className="my-3" key={job.id}>
                        <Card.Body key={job.id}>
                          <div className="d-sm-flex">
                            <div className="ms-2">
                              <Card.Title>{job.job_title}</Card.Title>
                              {company?.map((com) => {
                                if (job.job_company_name === com.username) {
                                  return <h6>Company: {com.company}</h6>;
                                }
                              })}
                              <Card.Text>
                                Salary : {job.job_CTC_min} to {job.job_CTC_max}{" "}
                                {job.job_CTC_breakup}
                                <br />
                                Category : {job.job_category}
                                &nbsp; Type : {job.job_type}
                                <Badge
                                  text="white"
                                  className="py-2 card-badge"
                                  bg={
                                    job.job_status === 0 ? "warning" : "success"
                                  }
                                >
                                  {job.job_status === 0 ? (
                                    <p className="m-0">Draft</p>
                                  ) : (
                                    <p className="m-0">Published</p>
                                  )}
                                </Badge>
                              </Card.Text>
                              <div className="d-flex">
                                <Button
                                  variant="primary"
                                  onClick={() => navigate(`/job/${job.id}`)}
                                >
                                  <AIicons.AiOutlineEye /> View
                                </Button>
                                <Button
                                  variant="danger"
                                  className="ms-2"
                                  onClick={() => deleteJob(job.id)}
                                >
                                  <AIicons.AiOutlineDelete /> Delete
                                </Button>
                                <Button
                                  onClick={() => jobStatus(job.id)}
                                  variant={
                                    job.job_status === 0 ? "success" : "warning"
                                  }
                                  className="ms-2 d-flex align-items-center"
                                >
                                  <AIicons.AiOutlineUpload />
                                  {job.job_status === 0 ? (
                                    <p className="m-0">Publish</p>
                                  ) : (
                                    <p className="m-0">Draft</p>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })
              : null}
          </Row>

          <ToastContainer className="theToast" />
        </Container>
      </div>
      <Sidebar></Sidebar>
    </Layouts>
  );
}
