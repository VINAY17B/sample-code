import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Layouts from "../../components/Layouts";
import Sidebar from "../../components/Sidebar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { getCookie, isAuth, logout } from "../../core/helpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactTags from "react-tag-autocomplete";
import { validation } from "../../core/validations";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function CompanyReg() {
  const navigate = useNavigate();
  const token = getCookie("token");
  const [picture, setPicture] = useState();
  const [values, setValues] = useState({
    username: "",
    name: "",
    desc: "",
    email: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    number: "",
    location: "",
    photo: "",
    tandc: false,
    isVerified: false,
  });
  const {
    name,
    desc,
    email,
    username,
    facebook,
    twitter,
    linkedin,
    number,
    location,
    photo,
    tandc,
    isVerified,
  } = values;

  const [nameerror, setNameError] = useState("");

  const [textinfo, settextinfo] = useState({
    title: "",
  });

  let editorState = EditorState.createEmpty();
  const [description, setDescription] = useState(editorState);
  const onEditorStateChange = (editorState) => {
    setDescription(editorState);
  };

  const handelchange = (text) => (e) => {
    console.log(e.target.value);
    setValues({ ...values, [text]: e.target.value });
  };
  const handeleusername = (e) => {
    setValues({ ...values, username: e.target.value });
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_URL}/company/get-username/${e.target.value}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setNameError(response.data.message);
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
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setValues({ ...values, photo: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handelcheck = () => {
    if (tandc === true) {
      setValues({ ...values, tandc: false });
    } else {
      setValues({ ...values, tandc: true });
    }
    console.log(tandc, isVerified, !tandc && isVerified);
  };
  const submitform = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", textinfo.description.value);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("facebook", facebook);
    formData.append("twitter", twitter);
    formData.append("linkedin", linkedin);
    formData.append("number", number);
    formData.append("location", location);
    formData.append("picture", picture);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_URL}/company/registration`,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        alert("Registration Sucessful");
        navigate(`/${username}`);
      })
      .catch((err) => {
        console.log(err.response.data);

        alert(err.response.data.error);
      });
  };
  return (
    <Layouts>
      <Sidebar></Sidebar>
      <Container className="d-flex justify-content-center">
        <div className=" mt-5 card-lg py-5">
          <h3 className="my-3">Register Company</h3>
          <Form method="POST" enctype="multipart/form-data">
            <img src={photo} className="img-lg" />
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Comapny Image</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageChange}
                name="Logo"
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label> Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={handelchange("name")}
                    placeholder="Enter Company Name"
                  />

                  {/* <Form.Text className="text-danger">{nameerror}</Form.Text> */}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={handeleusername}
                    placeholder="Enter Username for URL"
                  />
                  <Form.Text className="text-danger">{nameerror}</Form.Text>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Company Description</Form.Label>
                  <Editor
                    editorState={description}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onEditorStateChange}
                  />
                  <textarea
                    style={{ display: "none" }}
                    disabled
                    ref={(val) => (textinfo.description = val)}
                    value={draftToHtml(
                      convertToRaw(description.getCurrentContent())
                    )}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}></Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    value={number}
                    onChange={handelchange("number")}
                    placeholder="Enter number"
                  />
                  {/* <Form.Text className="text-danger">{numbererror}</Form.Text> */}
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
                    onChange={handelchange("email")}
                    placeholder="Enter email"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Facebook</Form.Label>
                  <Form.Control
                    type="text"
                    value={facebook}
                    onChange={handelchange("facebook")}
                    placeholder="Enter Link"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Linkedin</Form.Label>
                  <Form.Control
                    type="text"
                    value={linkedin}
                    onChange={handelchange("linkedin")}
                    placeholder="Enter Link"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Twitter</Form.Label>
                  <Form.Control
                    type="text"
                    value={twitter}
                    onChange={handelchange("twitter")}
                    placeholder="Enter Link"
                  />
                </Form.Group>
              </Col>
              {/* <Col md={6}></Col> */}
            </Row>

            <Row>
              <Col md={6}></Col>
              <Col md={6}></Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Check
                inline
                label="Agree to Terms and condition"
                name="tandc"
                onChange={handelcheck}
                type={"checkbox"}
                id={`tandc`}
              />
            </Form.Group>

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
              disabled={!tandc}
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
