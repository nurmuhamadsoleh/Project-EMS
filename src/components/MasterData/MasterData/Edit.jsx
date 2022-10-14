import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { classes } from "../../../data/layouts";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import {
  Form,
  Label,
  FormGroup,
  Container,
  Button,
  Col,
  Row,
} from "reactstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { FiSave } from "react-icons/fi";

const MasterDataEdit = () => {
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  let { id } = useParams();
  const nav = useNavigate();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
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
  const getDataKaryawan = async () => {
    showLoader();
    await axios({
      method: "GET",
      url: ` http://localhost:3004/masterdata/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    })
      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          let data = res.data;
          setUpdate({
            ID: data.ID,
            type: data.type,
            serial: data.serial,
            name: data.name,
            group: data.group,
            location: data.location,
            power: data.power,
            vnominal: data.vnominal,
            lnominal: data.lnominal,
          });
          hideLoader();
          Swal.fire("sucess", "Data Berhasil Di Tampilkan", "success");
        }
      })
      .catch((err) => {
        console.log(err);
        hideLoader();
        Swal.fire("Sorry", "Data Gagal Di Tampilkan", "warning");
      });
  };
  const handleInputData = () => {
    let done = true;
    let post = update;
    if (done) {
      Swal.fire({
        title: "Apakah anda yakin ingin melakukan update?",
        text: "Data akan tersimpan di database",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Simpan Mater Data",
      }).then((result) => {
        if (result.isConfirmed) {
          showLoader();
          axios({
            method: "PUT",
            url: ` http://localhost:3004/masterdata/${id}`,
            headers: {
              "Content-Type": "application/json",
            },
            data: post,
          })
            .then((res) => {
              console.log(res);
              Swal.fire("Succes", "Data Berhasil di Simpan", "success");
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
              // reset();
              nav(`${process.env.PUBLIC_URL}/dasboardmasterdata/${layout}`);
            })
            .catch((err) => {
              console.log(err);
              Swal.fire("Sorry", "Data Gagal Melakukan Simpan", "error");
              hideLoader();
            });
        }
      });
    }
  };
  useEffect(() => {
    getDataKaryawan();
  }, []);
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
                  value={update.ID}
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
                  value={update.type}
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
                  value={update.serial}
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
                  value={update.name}
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
                  value={update.group}
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
                  value={update.location}
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
                  name="power"
                  id="power"
                  placeholder="Masukan Power Meter Data"
                  value={update.power}
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
                  value={update.vnominal}
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
                  value={update.lnominal}
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
              className="btn btn-danger px-2"
              size="sm"
              onClick={() =>
                nav(`${process.env.PUBLIC_URL}/dasboardmasterdata/${layout}`)
              }
            >
              Cancel
            </Button>
            <Button
              color="primary"
              className="px-2 ms-3"
              size="sm"
              onClick={handleInputData}
            >
              <FiSave className="me-2" /> Simpan
            </Button>
          </div>
        </Form>
        {loader}
      </Container>
    </>
  );
};
export default MasterDataEdit;
