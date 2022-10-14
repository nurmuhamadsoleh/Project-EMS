import React, { Fragment } from "react";
import Breadcrumb from "../../../layout/breadcrumb";
import { Container } from "reactstrap";
import Cards from "../../../parts/Cards";

const OverviewAllMeters = () => {
  return (
    <Fragment>
      <Breadcrumb parent="Dashboard" title="OVERVIEW ALL METERS" />
      <Container>
        <Cards bgColor={"#50aa05"} />
      </Container>
    </Fragment>
  );
};

export default OverviewAllMeters;
