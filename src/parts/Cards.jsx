import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Container,
  CardLink,
  Form,
  Label,
  Input,
  CardFooter,
  Table,
} from "reactstrap";

const Cards = ({ bgColor }) => {
  const styleFotter = {
    height: "30px",
    padding: "0px 0px",
    margin: "0px 0px",
    justifyContent: "space-between",
  };
  const CardStyled = {
    padding: "0px 0px",
    height: "200px",
    margin: "0px 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <Container>
      <Row>
        <Col className="col-sm-4">
          <Card
            className="p-0 justify-content-start"
            // style={{ backgroundColor: bg }}
            color="primary"
          >
            <CardBody style={CardStyled}>
              <Row className="p-0 d-flex justify-content-center">
                <Col className="col-sm-4">
                  <CardTitle
                    tag="p"
                    className="text-light text-uppercase text-start"
                  >
                    Group
                  </CardTitle>
                  <CardTitle
                    tag="p"
                    className="text-light text-uppercase text-start"
                  >
                    Nama
                  </CardTitle>
                  <CardTitle
                    tag="p"
                    className="text-light text-uppercase text-start"
                  >
                    ID
                  </CardTitle>
                  <CardTitle
                    tag="p"
                    className="text-light text-uppercase text-start"
                  >
                    Type
                  </CardTitle>
                </Col>
                <Col className="col-sm-7">
                  <CardTitle
                    tag="p"
                    className="text-light text-text-uppercase fw-bold text-start"
                  >
                    G1 / POWER HOUSE & WWTP
                  </CardTitle>
                  <CardTitle
                    tag="p"
                    className="text-light text-uppercase text-start"
                  >
                    INDUK_PLN
                  </CardTitle>
                  <CardTitle
                    tag="p"
                    className="text-light text-uppercase text-start"
                  >
                    COMP1_4
                  </CardTitle>
                  <CardTitle
                    tag="p"
                    className="text-light text-uppercase text-start"
                  >
                    ION 7750
                  </CardTitle>
                </Col>
              </Row>
            </CardBody>
            <Form className="bg-info d-flex justify-content-center">
              <Table>
                <tbody>
                  <tr>
                    <td>
                      <Label for="email" className="fw-bold text-start">
                        V avg
                      </Label>
                    </td>
                    <td>
                      <Input
                        id="email"
                        name="email"
                        type="password"
                        className="w-100"
                      />
                    </td>
                    <td>
                      <Label for="v" className="fw-bold text-success">
                        V
                      </Label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Label for="email" className="fw-bold text-start">
                        I avg
                      </Label>
                    </td>
                    <td>
                      <Input
                        id="email"
                        name="email"
                        type="password"
                        className="w-100"
                      />
                    </td>
                    <td>
                      <Label for="v" className="fw-bold text-success">
                        A
                      </Label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Label for="email" className="fw-bold text-start">
                        S Total
                      </Label>
                    </td>
                    <td>
                      <Input
                        id="email"
                        name="email"
                        type="password"
                        className="w-100"
                      />
                    </td>
                    <td>
                      <Label for="v" className="fw-bold text-success">
                        KWA
                      </Label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Label for="email" className="fw-bold text-start">
                        P Total
                      </Label>
                    </td>
                    <td>
                      <Input
                        id="email"
                        name="email"
                        type="password"
                        className="w-100"
                      />
                    </td>
                    <td>
                      <Label for="v" className="fw-bold text-success">
                        KW
                      </Label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Label for="email" className="fw-bold text-start">
                        Stand KWH
                      </Label>
                    </td>
                    <td>
                      <Input
                        id="email"
                        name="email"
                        type="password"
                        className="w-100"
                      />
                    </td>
                    <td>
                      <Label for="v" className="fw-bold text-success">
                        KWH
                      </Label>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Form>
            <CardBody className="bg-black" style={styleFotter}>
              <Row>
                <Col>
                  <CardText className="text-light fw-bold text-start">
                    1
                  </CardText>
                </Col>
                <Col>
                  <CardText className="text-light fw-bold text-end">
                    Date-Time
                  </CardText>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col className="col-sm-4">
          <Card
            className="p-0 justify-content-start"
            style={{ backgroundColor: bgColor }}
            // color="primary"
          >
            <CardBody style={CardStyled}>
              <Row className="p-0 d-flex justify-content-center">
                <Col className="col-sm-4">
                  <CardTitle
                    tag="p"
                    className="text-light text-uppercase text-start"
                  >
                    Group
                  </CardTitle>
                  <CardTitle
                    tag="p"
                    className="text-light text-uppercase text-start"
                  >
                    Nama
                  </CardTitle>
                  <CardTitle
                    tag="p"
                    className="text-light text-uppercase text-start"
                  >
                    ID
                  </CardTitle>
                  <CardTitle
                    tag="p"
                    className="text-light text-uppercase text-start"
                  >
                    Type
                  </CardTitle>
                </Col>
                <Col className="col-sm-7">
                  <CardTitle
                    tag="p"
                    className="text-light text-text-uppercase fw-bold text-start"
                  >
                    G1 / POWER HOUSE & WWTP
                  </CardTitle>
                  <CardTitle
                    tag="p"
                    className="text-light text-uppercase text-start"
                  >
                    INDUK_PLN
                  </CardTitle>
                  <CardTitle
                    tag="p"
                    className="text-light text-uppercase text-start"
                  >
                    COMP1_4
                  </CardTitle>
                  <CardTitle
                    tag="p"
                    className="text-light text-uppercase text-start"
                  >
                    ION 7750
                  </CardTitle>
                </Col>
              </Row>
            </CardBody>
            <Form className="bg-info d-flex justify-content-center">
              <Table>
                <tbody>
                  <tr>
                    <td>
                      <Label for="email" className="fw-bold text-start">
                        V avg
                      </Label>
                    </td>
                    <td>
                      <Input
                        id="email"
                        name="email"
                        type="password"
                        className="w-100"
                      />
                    </td>
                    <td>
                      <Label for="v" className="fw-bold text-success">
                        V
                      </Label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Label for="email" className="fw-bold text-start">
                        I avg
                      </Label>
                    </td>
                    <td>
                      <Input
                        id="email"
                        name="email"
                        type="password"
                        className="w-100"
                      />
                    </td>
                    <td>
                      <Label for="v" className="fw-bold text-success">
                        A
                      </Label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Label for="email" className="fw-bold text-start">
                        S Total
                      </Label>
                    </td>
                    <td>
                      <Input
                        id="email"
                        name="email"
                        type="password"
                        className="w-100"
                      />
                    </td>
                    <td>
                      <Label for="v" className="fw-bold text-success">
                        KWA
                      </Label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Label for="email" className="fw-bold text-start">
                        P Total
                      </Label>
                    </td>
                    <td>
                      <Input
                        id="email"
                        name="email"
                        type="password"
                        className="w-100"
                      />
                    </td>
                    <td>
                      <Label for="v" className="fw-bold text-success">
                        KW
                      </Label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Label for="email" className="fw-bold text-start">
                        Stand KWH
                      </Label>
                    </td>
                    <td>
                      <Input
                        id="email"
                        name="email"
                        type="password"
                        className="w-100"
                      />
                    </td>
                    <td>
                      <Label for="v" className="fw-bold text-success">
                        KWH
                      </Label>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Form>
            <CardBody className="bg-black" style={styleFotter}>
              <Row>
                <Col>
                  <CardText className="text-start text-light fw-bold flex-start">
                    1
                  </CardText>
                </Col>
                <Col>
                  <CardText className="text-end text-light fw-bold flex-end">
                    Date-Time
                  </CardText>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col className="col-sm-4">
          <Card className="p-0 justify-content-start" color="primary">
            <CardBody style={CardStyled}>
              <Row className="p-0 d-flex justify-content-center">
                <Col className="col-sm-4">
                  <CardTitle
                    tag="p"
                    className="text-light text-uppercase text-start"
                  >
                    Group
                  </CardTitle>
                  <CardTitle
                    tag="p"
                    className="text-light text-uppercase text-start"
                  >
                    Nama
                  </CardTitle>
                  <CardTitle
                    tag="p"
                    className="text-light text-uppercase text-start"
                  >
                    ID
                  </CardTitle>
                  <CardTitle
                    tag="p"
                    className="text-light text-uppercase text-start"
                  >
                    Type
                  </CardTitle>
                </Col>
                <Col className="col-sm-7">
                  <CardTitle
                    tag="p"
                    className="text-light text-text-uppercase fw-bold text-start"
                  >
                    G1 / POWER HOUSE & WWTP
                  </CardTitle>
                  <CardTitle
                    tag="p"
                    className="text-light text-uppercase text-start"
                  >
                    INDUK_PLN
                  </CardTitle>
                  <CardTitle
                    tag="p"
                    className="text-light text-uppercase text-start"
                  >
                    COMP1_4
                  </CardTitle>
                  <CardTitle
                    tag="p"
                    className="text-light text-uppercase text-start"
                  >
                    ION 7750
                  </CardTitle>
                </Col>
              </Row>
            </CardBody>
            <Form className="bg-info d-flex justify-content-center">
              <Table>
                <tbody>
                  <tr>
                    <td>
                      <Label for="email" className="fw-bold text-start">
                        V avg
                      </Label>
                    </td>
                    <td>
                      <Input
                        id="email"
                        name="email"
                        type="password"
                        className="w-100"
                      />
                    </td>
                    <td>
                      <Label for="v" className="fw-bold text-success">
                        V
                      </Label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Label for="email" className="fw-bold text-start">
                        I avg
                      </Label>
                    </td>
                    <td>
                      <Input
                        id="email"
                        name="email"
                        type="password"
                        className="w-100"
                      />
                    </td>
                    <td>
                      <Label for="v" className="fw-bold text-success">
                        A
                      </Label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Label for="email" className="fw-bold text-start">
                        S Total
                      </Label>
                    </td>
                    <td>
                      <Input
                        id="email"
                        name="email"
                        type="password"
                        className="w-100"
                      />
                    </td>
                    <td>
                      <Label for="v" className="fw-bold text-success">
                        KWA
                      </Label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Label for="email" className="fw-bold text-start">
                        P Total
                      </Label>
                    </td>
                    <td>
                      <Input
                        id="email"
                        name="email"
                        type="password"
                        className="w-100"
                      />
                    </td>
                    <td>
                      <Label for="v" className="fw-bold text-success">
                        KW
                      </Label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Label for="email" className="fw-bold text-start">
                        Stand KWH
                      </Label>
                    </td>
                    <td>
                      <Input
                        id="email"
                        name="email"
                        type="password"
                        className="w-100"
                      />
                    </td>
                    <td>
                      <Label for="v" className="fw-bold text-success">
                        KWH
                      </Label>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Form>
            <CardBody className="bg-black" style={styleFotter}>
              <Row>
                <Col>
                  <CardText className=" text-light fw-bold text-start">
                    1
                  </CardText>
                </Col>
                <Col>
                  <CardText className="text-light fw-bold text-start">
                    Date-Time
                  </CardText>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cards;
