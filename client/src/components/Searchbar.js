import React, { Fragment } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  AiOutlineSearch,
  AiOutlineCloseCircle,
  AiOutlineEnvironment,
  AiOutlineClockCircle,
} from "react-icons/ai";
export default function Searchbar() {
  return (
    <Fragment>
      {/* <Container className="my-5">
        <div className=" search-box-container">
          <div className="search-box">
            <div className=" ">
              <form className="search-block-job">
                <AiOutlineSearch className="searchbar-icon-2" />
                <label className="search-label label"></label>
                <input
                  className="search-input home-input"
                  placeholder="User Experience"
                  type="/search"
                  value=""
                />
              </form>
            </div>
            <AiOutlineCloseCircle className="searchbar-icon" />
            <div className="line"></div>
            <div className=" ">
              <form className="search-block">
                <AiOutlineEnvironment className="searchbar-icon-2" />
                <label className="search-label label"></label>
                <input
                  className="search-input home-input"
                  placeholder="Address, City, State"
                  type="/search"
                  value=""
                />
              </form>
            </div>
            <AiOutlineCloseCircle className="searchbar-icon" />
            <div className="ms-3 ">
              <Button className="search-button">Find it Now</Button>
            </div>
          </div>
        </div>
      </Container> */}
      <Container className="my-5">
        <div className="serch-bar">
          <Row className="d-flex justify-content-center  align-items-center">
            <Col
              md={6}
              className="d-flex justify-content-between align-items-center "
            >
              <form className="search-bar-block d-flex  align-items-center ms-md-5" onSubmit={() =>{console.log("Searching")}}>
                <AiOutlineSearch className="searchbar-icon-2" />
                <input
                  className="search-input home-input"
                  placeholder="User Experience"
                  type="search"
                  // value=""
                />
                
              </form>
              <AiOutlineCloseCircle className="searchbar-icon" />
            </Col>

            <Col md={6}>
              <Row className="d-flex justify-content-end">
                <Col
                  md={9}
                  className="d-flex justify-content-between   align-items-center"
                >
                  <form className="search-bar-block  d-flex align-items-center">
                    <div className="line"></div>
                    <AiOutlineEnvironment className="searchbar-icon-2" />

                    <input
                      className="search-input home-input"
                      placeholder="Address, City, State"
                      type="/search"
                      // value=""
                    />
                  </form>
                  <AiOutlineCloseCircle className="searchbar-icon" />
                </Col>
                <Col md={3}>
                  <Button className="search-btn">Find it Now</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
}
