import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdownselect from "./Dropdownselect";
import Form from "react-bootstrap/Form";
export default function SearchOptions() {
  return (
    <Container>
      <Row>
        <Col md={6} lg={3}>
          <Dropdownselect typetext="Sort by" o1="Relevance" o2="Newest first" />
        </Col>
        <Col md={6} lg={3}>
          <Dropdownselect typetext="Type" o1="Full Time" o2="Part Time" />
        </Col>
        <Col md={6} lg={3}>
          <h6>Remote :</h6>
          <Form>
            <Form.Check type="switch" id="custom-switch" />
          </Form>
        </Col>
        <Col md={6} lg={3}>
          <Dropdownselect typetext="Level" o1="Senier" o2="Junior" />
        </Col>
      </Row>
    </Container>
  );
}
