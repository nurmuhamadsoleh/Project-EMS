import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FiSave, FiChevronLeft } from "react-icons/fi";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import Swal from "sweetalert2";
import axios from "axios";
import { classes } from "../../../data/layouts";
import {
  Form,
  Label,
  FormGroup,
  Container,
  Button,
  Col,
  Row,
} from "reactstrap";

const MasterDataAdd = () => {
  const nav = useNavigate();
  const [update, setUpdate] = useState({
    ID: "",
    type: "",
    serial: "",
    name: "",
    group: "",
    location: "",
    power: "",
    vnominal: "",
    lnominal: "",
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
            url: "http://localhost:3004/masterdata",
            data: post,
          })
            .then((res) => {
              console.log(res);
              Swal.fire(
                "Berhasil!",
                "Data Meter Group Berhasil Di Tambhakan.",
                "success"
              );
              hideLoader();
              setUpdate({
                ID: "",
                type: "",
                serial: "",
                name: "",
                group: "",
                location: "",
                power: "",
                vnominal: "",
                lnominal: "",
              });
              nav(`${process.env.PUBLIC_URL}/dasboardmasterdata/${layout}`);
            })
            .catch((err) => {
              console.log(err);
              hideLoader();
              Swal.fire(
                "Peringatan!",
                "Terjadi kesalahan saat menambah data meter group",
                "warning"
              );
            });
        }
      });
    }
  };
  return (
    <>
      <Container
        className="bg-primary p-3 pt-5 rounded-3"
        style={{ width: "80%", marginTop: "150px" }}
      >
        <Form>
          <FormGroup row>
            <Row>
              <Label htmlFor="id" sm={3}>
                ID
              </Label>
              <Col sm={8}>
                <input
                  type="text"
                  name="id"
                  id="id"
                  placeholder="Masukan ID Meter Data"
                  onChange={(t) =>
                    setUpdate({
                      ...update,
                      ID: t.target.value,
                    })
                  }
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label htmlFor="type" sm={8}>
                Type
              </Label>
              <Col sm={8}>
                <input
                  type="text"
                  name="type"
                  id="type"
                  placeholder="Masukan Type Meter Data"
                  onChange={(t) =>
                    setUpdate({
                      ...update,
                      type: t.target.value,
                    })
                  }
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label htmlFor="serial" sm={8}>
                Serial
              </Label>
              <Col sm={8}>
                <input
                  type="text"
                  name="serial"
                  id="serial"
                  placeholder="Masukan Serial Meter Data"
                  onChange={(t) =>
                    setUpdate({
                      ...update,
                      serial: t.target.value,
                    })
                  }
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label htmlFor="name" sm={8}>
                Name
              </Label>
              <Col sm={8}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Masukan Name Meter Data"
                  onChange={(t) =>
                    setUpdate({
                      ...update,
                      name: t.target.value,
                    })
                  }
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label htmlFor="group" sm={8}>
                Group
              </Label>
              <Col sm={8}>
                <input
                  type="text"
                  name="group"
                  id="text"
                  placeholder="Masukan Group Meter Data"
                  onChange={(t) =>
                    setUpdate({
                      ...update,
                      group: t.target.value,
                    })
                  }
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label htmlFor="location" sm={8}>
                Location
              </Label>
              <Col sm={8}>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Masukan Location Meter Data"
                  onChange={(t) =>
                    setUpdate({
                      ...update,
                      location: t.target.value,
                    })
                  }
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label htmlFor="power" sm={8}>
                Power
              </Label>
              <Col sm={8}>
                <input
                  type="number"
                  name="group"
                  id="power"
                  placeholder="Masukan Power Meter Data"
                  onChange={(t) =>
                    setUpdate({
                      ...update,
                      power: t.target.value,
                    })
                  }
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label htmlFor="vnominal" sm={8}>
                V Nominal
              </Label>
              <Col sm={8}>
                <input
                  type="number"
                  name="vnominal"
                  id="vnominal"
                  placeholder="Masukan Nominal Meter Data"
                  onChange={(t) =>
                    setUpdate({
                      ...update,
                      vnominal: t.target.value,
                    })
                  }
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label htmlFor="Inominal" sm={8}>
                I Nominal
              </Label>
              <Col sm={8}>
                <input
                  type="number"
                  name="Inominal"
                  id="Inominal"
                  placeholder="Masukan Inominal Meter Data"
                  onChange={(t) =>
                    setUpdate({
                      ...update,
                      lnominal: t.target.value,
                    })
                  }
                />
              </Col>
            </Row>
          </FormGroup>
          <div className="d-flex justify-content-end gap-2">
            <Button
              type="reset"
              className="btn btn-danger"
              onClick={() =>
                nav(`${process.env.PUBLIC_URL}/dasboardmasterdata/${layout}`)
              }
            >
              Cancel
            </Button>
            <Button type="button" color="primary" onClick={handleAdd}>
              Simpan
            </Button>
          </div>
        </Form>
        {loader}
      </Container>
    </>
  );
};
export default MasterDataAdd;
