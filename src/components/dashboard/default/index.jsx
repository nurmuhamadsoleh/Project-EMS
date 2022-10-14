import React, { Fragment } from "react";
import Breadcrumb from "../../../layout/breadcrumb";
import { useNavigate } from "react-router";
import { classes } from "../../../data/layouts";
import { FiLayers } from "react-icons/fi";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  CardImg,
  CardImgOverlay,
  CardText,
  CardTitle,
} from "reactstrap";

const MetersByGroup = () => {
  const styled = {
    backgroundColor: "red",
    height: "80px",
    margin: "0px 0px",
    padding: "0px 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  const nav = useNavigate();
  const handleAdd = () => {
    console.group("Sukses");
    nav(`${process.env.PUBLIC_URL}/dashboard/overviewallmeters/${layout}`);
  };
  return (
    <Fragment>
      <Breadcrumb parent="Dashboard" title="Meters By Group" />
      <Container
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Row>
          <Col className="col-sm-4">
            <Card
              inverse
              className="p-0 d-flex justify-content-between"
              color="black"
            >
              <CardBody style={styled}>
                <Row className="p-0">
                  <Col className="col-sm-4">
                    <CardTitle
                      tag="p"
                      className="text-light text-uppercase text-start"
                    >
                      G02
                    </CardTitle>
                  </Col>
                  <Col className="d-flex flex-wrap flex-column">
                    <CardTitle
                      tag="p"
                      className="text-light text-uppercase text-center"
                    >
                      GD CU & GD OT
                    </CardTitle>
                  </Col>
                  <Col className="col-sm-3">
                    <Button color="warning" size="sm" onClick={handleAdd}>
                      Details
                    </Button>
                  </Col>
                </Row>
              </CardBody>
              <CardImg
                alt="GD CU & GD OT"
                src="https://picsum.photos/300/200"
                style={{ height: 270 }}
                width="100%"
              />
              <CardImgOverlay
                className="text-start"
                style={{ marginTop: "80px" }}
              >
                <CardTitle tag="h1" className="fw-bold text-black">
                  9
                </CardTitle>
                <CardText className="fw-bold text-black">KWH Meters</CardText>
              </CardImgOverlay>
            </Card>
          </Col>
          <Col className="col-sm-4">
            <Card
              inverse
              className="p-0 d-flex justify-content-between"
              color="black"
            >
              <CardBody style={styled}>
                <Row className="p-0">
                  <Col className="col-sm-4">
                    <CardTitle
                      tag="p"
                      className="text-light text-uppercase text-start"
                    >
                      G03
                    </CardTitle>
                  </Col>
                  <Col className="d-flex flex-wrap flex-column">
                    <CardTitle
                      tag="p"
                      className="text-light text-uppercase text-center"
                    >
                      GD3
                    </CardTitle>
                  </Col>
                  <Col className="col-sm-3">
                    <Button color="warning" size="sm">
                      Details
                    </Button>
                  </Col>
                </Row>
              </CardBody>
              <CardImg
                alt="GD2, GD1.OFFICE"
                src="https://picsum.photos/300/200"
                style={{ height: 270 }}
                width="100%"
              />
              <CardImgOverlay
                className="text-start"
                style={{ marginTop: "80px" }}
              >
                <CardTitle tag="h1" className="fw-bold text-black">
                  8
                </CardTitle>
                <CardText className="fw-bold text-black">KWH Meters</CardText>
              </CardImgOverlay>
            </Card>
          </Col>
          <Col className="col-sm-4">
            <Card
              inverse
              className="p-0 d-flex justify-content-between"
              color="black"
            >
              <CardBody style={styled}>
                <Row className="p-0">
                  <Col className="col-sm-4">
                    <CardTitle
                      tag="p"
                      className="text-light text-uppercase text-start"
                    >
                      G04
                    </CardTitle>
                  </Col>
                  <Col className="d-flex flex-wrap flex-column">
                    <CardTitle
                      tag="p"
                      className="text-light text-uppercase text-center"
                    >
                      GD2, GD1.OFFICE
                    </CardTitle>
                  </Col>
                  <Col className="col-sm-3">
                    <Button color="warning" size="sm">
                      Details
                    </Button>
                  </Col>
                </Row>
              </CardBody>
              <CardImg
                alt="GD2, GD1.OFFICE"
                src="https://picsum.photos/300/200"
                style={{ height: 270 }}
                width="100%"
              />
              <CardImgOverlay
                className="text-start"
                style={{ marginTop: "80px" }}
              >
                <CardTitle tag="h1" className="fw-bold text-black">
                  7
                </CardTitle>
                <CardText className="fw-bold text-black">KWH Meters</CardText>
              </CardImgOverlay>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default MetersByGroup;
