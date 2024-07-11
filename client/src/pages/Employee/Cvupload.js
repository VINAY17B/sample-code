import React, { useEffect, useState } from "react";
import Layouts from "../../components/Layouts";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { getCookie, isAuth } from "../../core/helpers";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
export default function Cvupload() {
  const [email, setEmail] = useState("");
  const token = getCookie("token");
  const [resume, setResume] = useState();
  const [resumepdf, setResumePdf] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const handleFileChange = (e) => {
    // setValues({ ...values, pic: e.target.files[0] });
    setResume(e.target.files[0]);
    console.log(resume);
  };
  useEffect(() => {
    setEmail(isAuth().email);
    getPdf();
  }, []);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const getPdf = () => {
    axios({
      method: "GET",

      url: `${process.env.REACT_APP_URL}/employee/get-cv/${isAuth().email}`,
      headers: {
        Authorization: `Bearer ${token}`,
        mode: "no-cors",
      },
    })
      .then((response) => {
        console.log(response);

        setResumePdf(response.data);
        console.log(
          `${process.env.REACT_APP_UPLOADS_URL}/employee/resume/${resumepdf}`
        );
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const submitform = (e) => {
    e.preventDefault();

    console.log(email);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("file", resume);
    formData.append("path", `public/uploads/employee/resumes/${resumepdf}`);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/employee/cv-upload`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    })
      .then((response) => {
        console.log(response);
        toast.success("CV Uploaded Sucessfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        getPdf();
      })
      .catch((err) => {
        toast.danger(err.response.data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(err.response.data);
      });
  };
  return (
    <Layouts>
      <Container>
        <h1>Upload Your CV</h1>
        <Row>
          <Col md={4}>
            <Form method="POST" enctype="multipart/form-data">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload CV</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                  name="file"
                />
              </Form.Group>
              <Button
                className="btn mt-2"
                size="lg"
                onClick={submitform}
                type="submit"
              >
                Upload
              </Button>
            </Form>
          </Col>
          <Col md={8}>
            {resumepdf !== "" ? (
              <embed
                src={`${process.env.REACT_APP_UPLOADS_URL}/employee/resumes/${resumepdf}`}
                width="800px"
                height="900px"
              />
            ) : null}
          </Col>
        </Row>
      </Container>
      <ToastContainer className="theToast" />
    </Layouts>
  );
}

// <Link
//   to={`${process.env.REACT_APP_UPLOADS_URL}/employee/resumes/${resumepdf}`}
//   target="_blank"
// >
//   <Button>View Pdf</Button>
// </Link>;

//  <Document
//    file={`${process.env.REACT_APP_UPLOADS_URL}/employee/resumes/${resumepdf}`}
//    options={{ workerSrc: "/pdf.worker.js" }}
//    onLoadSuccess={onDocumentLoadSuccess}
//  >
//    <Page pageNumber={pageNumber} />
//  </Document>;
