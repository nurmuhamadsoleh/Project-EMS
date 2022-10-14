import React from "react";
import { Container, Row, Col, Card, CardTitle, CardText } from "reactstrap";
import Swal from "sweetalert2";
import axios from "axios";
import useFullPageLoader from "../hooks/useFullPageLoader";
import { classes } from "../../data/layouts";

const Variabel = () => {
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  return (
    <>
      <Container
        className="bg-danger pt-5 rounded-3"
        style={{ width: "80%", marginTop: "150px" }}
      >
        <Row>
          <Col lg={4}>
            <h1>Hello</h1>
          </Col>
          <Col lg={8}>
            <Card body>
              <CardTitle>z</CardTitle>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Variabel;
