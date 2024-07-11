import React from "react";
import Container from "react-bootstrap/esm/Container";
import Layouts from "../components/Layouts";
import Sidebar from "../components/Sidebar";
export default function Student() {
  return (
    <Layouts>
      <Sidebar></Sidebar>
      <Container>student</Container>
    </Layouts>
  );
}
