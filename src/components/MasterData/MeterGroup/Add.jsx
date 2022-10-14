import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSave, FiChevronLeft } from "react-icons/fi";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import useFullPageLoader from "../../hooks/useFullPageLoader";
// import { useForm } from "react-hook-form";
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
// const styled = {
//   borderRadius: "4px",
//   width: "100%",
//   outline: "none",
//   border: "none",
//   height: "35px",
// };

const MeterGroupAdd = () => {
  const nav = useNavigate();
  const [update, setUpdate] = useState({
    meterGroupID: "",
    meterGroupName: "",
  });
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  //   const iniState = {
  //     username: "",
  //     nama: "",
  //     email: "",
  //     level: "",
  //     status: "",
  //   };
  //   const [initialValues, setInitialValue] = useState(iniState);
  //   const validationSchema = yup
  //     .object({
  //       username: yup
  //         .string()
  //         .required("Field Username Wajib di isi")
  //         .matches(/^[A-Za-z ,.'-]+$/i, "Yang di input harus alfabet")
  //         .min(5, "Minimal 5 Karakter"),
  //       nama: yup
  //         .string()
  //         .required("Field Nama Wajib Di isi")
  //         .matches(/^[A-Za-z ,.'-]+$/i, "Yang di input harus alfabet")
  //         .min(5, "Minimal 5 Karekter"),
  //       email: yup.string().email().required("Field Email Wajib di isi"),
  //       level: yup.string().required("Field Level Authentication Wajib di isi"),
  //       status: yup.string().required("Field Status Akun Wajib di isi"),
  //     })
  //     .required();
  //   const handleSubmitData = (data) => {
  //     console.log(data);
  //   };
  //   const {
  //     register,
  //     watch,
  //     reset,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm({
  //     mode: "onTouched",
  //     reValidateMode: "onChange",
  //     defaultValues: initialValues,
  //     resolver: yupResolver(validationSchema),
  //   });
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
            url: "http://localhost:3004/meter",
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
                meterGroupID: "",
                meterGroupName: "",
              });
              nav(`${process.env.PUBLIC_URL}/dasboardgroup/${layout}`);
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
      <Container style={{ marginTop: "150px" }}>
        <Form>
          <FormGroup row>
            <Row>
              <Label htmlFor="metergroupid" sm={3}>
                Meter Group ID
              </Label>
              <Col sm={8}>
                <input
                  type="text"
                  name="metergroupid"
                  placeholder="Meter Group"
                  onChange={(t) =>
                    setUpdate({
                      ...update,
                      meterGroupID: t.target.value,
                    })
                  }
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label htmlFor="email" sm={8}>
                Meter Group Name
              </Label>
              <Col sm={8}>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Masukan Email Anda"
                  value={update.meterGroupName}
                  onChange={(t) =>
                    setUpdate({
                      ...update,
                      meterGroupName: t.target.value,
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
                nav(`${process.env.PUBLIC_URL}/dasboardgroup/${layout}`)
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
      {/* <Container
        className="bg-primary p-3 pt-5 rounded-3"
        style={{ width: "80%", marginTop: "150px" }}
      >
        <Form onSubmit={handleSubmit(handleSubmitData)}>
          <FormGroup row>
            <Label
              for="UserName"
              sm={3}
              className="text-start text-light fw-bold me-2"
            >
              Username
            </Label>
            <Col sm={8}>
              <input
                id="UserName"
                name="UserName"
                placeholder="Masukan Username Anda"
                type="text"
                style={styled}
                {...register("username")}
              />
              {errors.username && (
                <p className="fw-bold text-danger">{errors.username.message}</p>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label
              for="nama"
              sm={3}
              className="text-start text-light fw-bold me-2"
            >
              Your Name
            </Label>
            <Col sm={8}>
              <input
                id="nama"
                name="nama"
                placeholder="Masukan Nama Anda"
                type="text"
                {...register("nama")}
                style={styled}
              />
              {errors.nama && (
                <p className="fw-bold text-danger">{errors.nama.message}</p>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label
              for="email"
              sm={3}
              className="text-start text-light fw-bold me-2"
            >
              Email Address
            </Label>
            <Col sm={8}>
              <input
                id="email"
                name="email"
                placeholder="Masukan Email Anda"
                type="email"
                style={styled}
                {...register("email")}
              />
              {errors.email && (
                <p className="fw-bold text-danger">{errors.email.message}</p>
              )}
            </Col>
          </FormGroup>
          <FormGroup>
            <div className="d-flex justify-content-start w-100 align-items-center">
              <Label for="level" className="text-start mb-3 text-light fw-bold">
                Level Authentication
              </Label>
              <FormGroup check>
                <input
                  id="level"
                  name="level"
                  type="radio"
                  value="superadmin"
                  className="m-3 p-0"
                  {...register("level")}
                />
                <Label className="fw-bold text-light">Super Admin</Label>
                <input
                  id="level"
                  name="level"
                  type="radio"
                  value="admin"
                  {...register("level")}
                  className="m-3 p-0"
                />
                <Label className="fw-bold text-light">Admin</Label>
                <input
                  id="level"
                  name="level"
                  type="radio"
                  value="user"
                  {...register("level")}
                  className="m-3 p-0"
                />
                <Label className="fw-bold text-light">User</Label>
              </FormGroup>
            </div>
            {errors?.level && (
              <p className="fw-bold text-danger text-center">
                {errors?.level.message}
              </p>
            )}
          </FormGroup>
          <FormGroup>
            <div className="d-flex justify-content-start w-100 align-items-center">
              <Label
                for="status"
                className="text-start mb-3 text-light fw-bold me-5"
              >
                Status Akun
              </Label>
              <FormGroup check className="ms-3">
                <input
                  id="status"
                  name="status"
                  type="radio"
                  value="aktif"
                  {...register("status")}
                  className="m-3 p-0"
                />

                <Label className="fw-bold text-light">Aktif</Label>
                <input
                  id="status"
                  name="status"
                  type="radio"
                  value="nonaktif"
                  {...register("status")}
                  className="m-3 p-0"
                />
                <Label className="fw-bold text-light">Non Aktif</Label>
              </FormGroup>
            </div>
            {errors?.level && (
              <p className="fw-bold text-danger text-center">
                {errors?.level.message}
              </p>
            )}
          </FormGroup>
          <FormGroup check row>
            <Col className="col-sm-12 d-flex justify-content-center">
              <Button
                color="danger"
                size="lg"
                className="me-3 rounded text-black"
                onClick={() => {
                  nav("/");
                }}
              >
                <FiChevronLeft className="fs-2" />
                cancel
              </Button>
              <Button
                color="primary"
                size="lg"
                className="me-3 rounded text-black"
              >
                <FiSave className="fs-2" />
                save
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Container> */}
    </>
  );
};

export default MeterGroupAdd;
