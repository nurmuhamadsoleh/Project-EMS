import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiSave,
  FiChevronLeft,
  FiDollarSign,
  FiChevronRight,
} from "react-icons/fi";
import DatePicker from "react-datepicker";
import axios from "axios";
import Swal from "sweetalert2";
import useFullPageLoader from "../hooks/useFullPageLoader";
import "./billing.css";
import { classes } from "../../data/layouts";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useForm } from "react-hook-form";
import {
  Form,
  Label,
  FormGroup,
  Container,
  Button,
  Col,
  Row,
  Card,
  ListGroup,
  ListGroupItem,
  Breadcrumb,
  BreadcrumbItem,
  CardBody,
  CardTitle,
} from "reactstrap";

const Billing = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const nav = useNavigate();
  const [update, setUpdate] = useState({
    tariflwbp: "",
    tarifwbp: "",
    datestart: "",
    dateend: "",
  });
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const handleAdd = async (e) => {
    e.preventDefault();
    let done = true;
    let post = update;
    if (done) {
      Swal.fire({
        title: "Apa anda yakin?",
        text: "Data akan tersimpan di database",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Simpan data!",
      }).then((result) => {
        if (result.isConfirmed) {
          showLoader();
          axios({
            method: "POST",
            url: "http://localhost:3004/user",
            data: post,
          })
            .then((res) => {
              console.log(res);
              Swal.fire(
                "Berhasil!",
                "Data User Berhasil Di Tambhakan.",
                "success"
              );
              hideLoader();
              setUpdate({
                tariflwbp: "",
                tarifwbp: "",
                datestart: "",
                dateend: "",
              });
              nav(`${process.env.PUBLIC_URL}/dashboardUser/${layout}`);
            })
            .catch((err) => {
              console.log(err);
              hideLoader();
              Swal.fire(
                "Peringatan!",
                "Terjadi kesalahan saat menambah data user",
                "warning"
              );
            });
        }
      });
    }
  };
  const azb = (v) => {
    // Jika Date / Tahun/Minute/Second Jika Kurang dari 1 maka tambahkan angka 0 di depannya
    if (parseInt(v) < 10) {
      v = "0" + v;
    }
    return v;
  };
  const genDate = (e, type) => {
    const d = new Date(e);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    //JIka Month yang di pilih sudah lebih dri 12 dan jika month yang di pilih terakhir/tinggal 1 maka tambahkan tahun nya.
    if (month > 12) {
      month = 1;
      ++year;
    }
    let date = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();

    year = azb(year);
    month = azb(month);
    date = azb(date);
    hour = azb(hour);
    minute = azb(minute);
    second = azb(second);

    if (type == "date") {
      return `${date}-${month}-${year}`;
    } else if (type == "time") {
      return `${hour}:${minute}:${second}`;
    } else if (type == "datetime") {
      return `${date}-${month}-${year} ${hour}:${minute}:${second}`;
    }
    return d;
  };
  const styled = {
    borderRadius: "4px",
    width: "100%",
    outline: "none",
    border: "none",
    height: "35px",
  };
  const styles = {
    with: "100%",
  };
  const Block = {
    fontWeight: "bold",
    color: "#000",
    "&:hover": {
      color: "#fff",
      textDecoration: "none",
      backgroundColor: "#1804c9",
      display: "inline-block",
    },
  };
  const DateStyled = {
    borderRadius: "4px",
    width: "10%",
    outline: "none",
    border: "none",
    height: "35px",
  };
  const handleCalculate = () => {
    nav(`${process.env.PUBLIC_URL}/dashboard/metersbygroup/${layout}`);
  };
  return (
    <>
      <Container
        className="bg-primary p-3 rounded-3"
        style={{
          width: "100%",
          marginTop: "150px",
        }}
      >
        <div className="row">
          <div className="col-md-6 mb-3 d-flex justify-content-start align-items-start">
            <h1 className="fw-bold fs-3">
              <FiDollarSign /> Biling
            </h1>
          </div>
        </div>
        <Form
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Row>
            <Col sm={12} md={6} lg={4}>
              <FormGroup row>
                <Row>
                  <Col>
                    <Label
                      for="tarif lwbp"
                      className="text-start text-light fw-bold"
                    >
                      Tarif LWBP/kWh (Rp.)
                    </Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <input
                      id="tarif lwbp"
                      name="tarif lwbp"
                      placeholder="Masukan Tarif LWBP"
                      type="number"
                      onChange={(t) => {
                        setUpdate({
                          ...update,
                          tariflwbp: t.target.value,
                        });
                      }}

                      // style={styled}
                      // {...register("username")}
                    />
                    {/* {errors.username && (
                <p className="fw-bold text-danger">{errors.username.message}</p>
              )} */}
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup row>
                <Row>
                  <Col>
                    <Label
                      for="tarifwbp"
                      className="text-start text-light fw-bold me-2"
                    >
                      Tarif WBP/kWh (Rp.)
                    </Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <input
                      id="tarifwbp"
                      name="tarifwbp"
                      placeholder="Masukan Tarif WBP Biling"
                      type="number"
                      onChange={(t) => {
                        setUpdate({
                          ...update,
                          tarifwbp: t.target.value,
                        });
                      }}
                      // {...register("nama")}
                      // style={styled}
                    />
                    {/* {errors.nama && (
                <p className="fw-bold text-danger">{errors.nama.message}</p>
              )} */}
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm={12}>
                    <Label
                      for="enddate"
                      className="text-start text-light fw-bold"
                    >
                      End Date
                    </Label>
                    <DatePicker
                      style={DateStyled}
                      dateFormat="dd-MM-yyyy"
                      dropdownMode="select"
                      showMonthDropdown
                      showYearDropdown
                      adjustDateOnChange
                      selected={startDate}
                      // value={default_value}
                      onChange={(e) => {
                        setStartDate(e);
                        genDate(e, "date");
                      }}
                    />
                  </Col>
                  <Col sm={12}>
                    <Label
                      for="endtime"
                      className="text-start text-light fw-bold"
                    >
                      End Time
                    </Label>
                    <DatePicker
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={5}
                      timeCaption="Time"
                      dateFormat="HH:mm"
                      selected={time}
                      // value={default_value}
                      onChange={(e) => {
                        setTime(e);
                        genDate(e, "time");
                      }}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col sm={12}>
                    <Label
                      for="meterID"
                      className="text-start text-light fw-bold"
                    >
                      End Date
                    </Label>
                    <DatePicker
                      style={DateStyled}
                      dateFormat="dd-MM-yyyy"
                      dropdownMode="select"
                      showMonthDropdown
                      showYearDropdown
                      adjustDateOnChange
                      selected={startDate}
                      // value={default_value}
                      onChange={(e) => {
                        setStartDate(e);
                        genDate(e, "date");
                      }}
                    />
                  </Col>
                  <Col sm={12}>
                    <Label
                      for="meterID"
                      className="text-start text-light fw-bold"
                    >
                      End Time
                    </Label>
                    <DatePicker
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={5}
                      timeCaption="Time"
                      dateFormat="HH:mm"
                      selected={time}
                      // value={default_value}
                      onChange={(e) => {
                        setTime(e);
                        genDate(e, "time");
                      }}
                    />
                  </Col>
                  {/* <Col sm={12}></Col> */}
                </Row>
              </FormGroup>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <h6 className="headine">Selectable Items</h6>
              <Card
                style={{
                  width: "18rem",
                  maxHeight: "405px",
                  overflowY: "scroll",
                  borderRadius: "20px",
                }}
              >
                <ListGroup flush>
                  <ListGroupItem>
                    <Link className="block">
                      1. WWTP NEW |POWER HOUSE & WWTP
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Link className="block">
                      {" "}
                      2. LV1_GENSET |POWER HOUSE & WWTP
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Link className="block">3. LV1 |POWER HOUSE & WWTP</Link>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Link className="block">
                      4. INDUK_PLN |POWER HOUSE & WWTP
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Link className="block">5. MV2 |POWER HOUSE & WWTP</Link>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Link className="block">6. MV1 |POWER HOUSE & WWTP</Link>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Link className="block">
                      {" "}
                      7. COMPRESSOR_LT1 |GD CU & GD OT
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Link className="block">8. LV2_LT2 |GD CU & GD OT</Link>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Link className="block">
                      9. INC.GEN.2_LT2 |GD CU & GD OT
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Link className="block">
                      10. OUT.GEN.2_LT2 & GD CU & GD OT
                    </Link>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Link className="block">11. OUT.GEN.1_LT2 & GD OT</Link>
                  </ListGroupItem>
                </ListGroup>
              </Card>
              <Breadcrumb className="breadcrumb">
                <BreadcrumbItem active>
                  <Link className="select">Select All</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Link className="select">Deselect All</Link>
                </BreadcrumbItem>
              </Breadcrumb>
              <Button
                className="btn btn-danger px-4 py-1"
                size="sm"
                onClick={handleCalculate}
              >
                Calculate <FiChevronRight />
              </Button>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <Card
                style={{
                  width: "18rem",
                  maxHeight: "405px",
                  overflowY: "scroll",
                  borderRadius: "20px",
                  marginLeft: "20px",
                  marginTop: "20px",
                }}
              >
                <ListGroup flush>
                  <ListGroupItem></ListGroupItem>
                  <ListGroupItem></ListGroupItem>
                  <ListGroupItem></ListGroupItem>
                  <ListGroupItem></ListGroupItem>
                  <ListGroupItem></ListGroupItem>
                  <ListGroupItem></ListGroupItem>
                  <ListGroupItem></ListGroupItem>
                  <ListGroupItem></ListGroupItem>
                  <ListGroupItem></ListGroupItem>
                  <ListGroupItem></ListGroupItem>
                  <ListGroupItem></ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
      {loader}
    </>
  );
};
export default Billing;
