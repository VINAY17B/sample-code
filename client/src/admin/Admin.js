import React from "react";
import Container from "react-bootstrap/esm/Container";
import Layouts from "../components/Layouts";
import Sidebar from "../components/Sidebar";

export default function Admin() {
  return (
    <Layouts>
      <Sidebar></Sidebar>
      <Container>hello</Container>
    </Layouts>
  );
}
