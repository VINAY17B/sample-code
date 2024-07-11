import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Layouts from "../../components/Layouts";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { getCookie, isAuth, logout } from "../../core/helpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactTags from "react-tag-autocomplete";
import { validation } from "../../core/validations";

export default function EmployerReg() {
  const navigate = useNavigate();
  const [picture, setPicture] = useState();
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
    location,
    number,
    domain,
    isVerified,
  } = values;
  const [errors, setErrors] = useState({
    nameerror: "",
    emailerror: "",
    numbererror: "",
  });
  const { nameerror, emailerror, numbererror } = errors;
  const [usernameerror, setUserNameError] = useState("");
  const [tags, setTags] = useState([]);
  const [tags2, setTags2] = useState();
  const token = getCookie("token");
  let count = 1;
  useEffect(() => {
    console.log(isAuth());
    setValues({ ...values, email: isAuth().email, name: isAuth().name });
  }, []);
  const handelchange = (text) => (e) => {
    console.log(e.target.value);
    setValues({ ...values, [text]: e.target.value });
    setErrors({
      ...errors,
      [text + "error"]: validation(text, e.target.value),
    });
  };

  const handeleusername = (e) => {
    setValues({ ...values, cname: e.target.value });
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/company/get-username/${e.target.value}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.data.res === true) {
          setUserNameError("");
        } else {
          setUserNameError("Company Username Dosent Exist");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleImageChange = (e) => {
    // setValues({ ...values, pic: e.target.files[0] });
    setPicture(e.target.files[0]);
    console.log(e.target.files[0]);
    console.log(picture);
  };
  const handelcheck = () => {
    if (recruiter.checked === true) {
      setValues({ ...values, recruiter: 1 });
    } else {
      setValues({ ...values, recruiter: 0 });
    }
    console.log(recruiter);
  };
  const handleDelete = (index) => {
    console.log("S>>>:");
    const newTags = tags.slice(0);
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleAddition = (tag) => {
    console.log(tag);

    const newTags = [].concat(tags, tag);
    const newTags2 = [].concat(tags2, tag.name);
    setTags(newTags);
    setTags2(newTags2);
  };

  const submitform = (e) => {
    e.preventDefault();
    // tags.map((key) => {
    //   console.log(key.name);
    // });
    // console.log(tags);
    console.log();
    const formData = new FormData();
    formData.append("employer_name", name);
    formData.append("employer_company_name", cname);
    formData.append("employer_domain", tags2);
    formData.append("employer_mobile", number);
    formData.append("employer_email", email);
    formData.append("employer_location", location);
    formData.append("employer_recruiter", recruiter);
    formData.append("picture", picture);
    console.log(tags);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/employer-registration`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    })
      .then((response) => {
        console.log(response);
        alert("Registration Sucessful");
        if (isAuth()) {
          logout(() => {
            navigate("/login");
          });
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setValues({
          ...values,
          cname: "",
          type: "",
          domain: "",
          number: "",
          location: "",
          recruiter: "",
        });
        alert(err.response.data.error);
      });
  };
  return (
    <Layouts>
      <Container className="d-flex justify-content-center">
        <div className=" mt-5 card-lg py-1">
          <h3 className="my-3">Register</h3>
          <Form method="POST" enctype="multipart/form-data">
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label> Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={handelchange("name")}
                    placeholder="Enter Name"
                  />
                  <Form.Text className="text-danger">{nameerror}</Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Company username</Form.Label>
                  <Form.Control
                    type="text"
                    value={cname}
                    onChange={handeleusername}
                    placeholder="Enter Company Name"
                  />
                  <Form.Text className="text-danger">{usernameerror}</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Domain</Form.Label>
                  <ReactTags
                    tags={tags}
                    suggestions={[]}
                    allowNew
                    onDelete={handleDelete}
                    onAddition={handleAddition}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Logo</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleImageChange}
                    name="Logo"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    type="text"
                    value={number}
                    onChange={handelchange("number")}
                    placeholder="Enter number"
                  />
                  <Form.Text className="text-danger">{numbererror}</Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    value={location}
                    onChange={handelchange("location")}
                    placeholder="Enter location"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    disabled
                    onChange={handelchange("email")}
                    placeholder="Enter email"
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
              </Col>
              {/* <Col md={6}></Col> */}
            </Row>
            <Form.Group className="mb-3">
              <Form.Check
                inline
                label="Is it okay for other Recruiters to contact you?"
                name="recruiter"
                onChange={handelcheck}
                type={"checkbox"}
                id={`recruiter`}
              />
            </Form.Group>
            <Row>
              <Col md={6}></Col>
              <Col md={6}></Col>
            </Row>

            {/* <div className="mb-3">
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
            </div> */}

            <Button
              className="btn mt-2"
              size="lg"
              onClick={submitform}
              type="submit"
            >
              Register
            </Button>
          </Form>
        </div>
      </Container>
    </Layouts>
  );
}

// {
//         employer_name: name,
//         employer_company_name: cname,
//         employer_domain: domain,
//         employer_mobile: number,
//         employer_email: email,
//         employer_location: location,
//         employer_recruiter: recruiter,
//         employer_logo: type,
//       },
