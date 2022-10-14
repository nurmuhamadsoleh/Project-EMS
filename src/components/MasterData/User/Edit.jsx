import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiSave, FiChevronLeft, FiUserCheck } from "react-icons/fi";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { classes } from "../../../data/layouts";
import axios from "axios";
import * as yup from "yup";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import Swal from "sweetalert2";
// import * as yup from "yup";
// import { useForm } from "react-hook-form";
// import { Label, Form, FormGroup, Container, Button, Col } from "reactstrap";
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

const ManagementUserEdit = () => {
  const nav = useNavigate();
  let { id } = useParams();
  const [user, setUser] = useState({
    username: "",
    name: "",
    email: "",
    level: "",
    status: "",
    password: "",
    newpassword: "",
  });
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const iniState = {
    username: "",
    name: "",
    email: "",
    level: "",
    status: "",
  };
  const [initialValues, setInitialValue] = useState(iniState);
  const validationSchema = yup
    .object({
      username: yup
        .string()
        .required("Field Username Wajib di isi")
        .matches(/^[A-Za-z ,.'-]+$/i, "Yang di input harus alfabet")
        .min(5, "Minimal 5 Karakter"),
      name: yup
        .string()
        .required("Field Nama Wajib Di isi")
        .matches(/^[A-Za-z ,.'-]+$/i, "Yang di input harus alfabet")
        .min(5, "Minimal 5 Karekter"),
      email: yup.string().email().required("Field Email Wajib di isi"),
      level: yup.string().required("Field Level Authentication Wajib di isi"),
      status: yup.string().required("Field Status Akun Wajib di isi"),
    })
    .required();
  // const handleSubmitData = (data) => {
  //   console.log(data);
  // };
  const {
    register,
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  const getDataUser = async () => {
    showLoader();
    await axios({
      method: "GET",
      url: `http://localhost:3004/user/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    })
      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
          let data = res.data;
          setUser({
            username: data.username,
            name: data.name,
            email: data.email,
            level: data.level,
            status: data.status,
            password: data.password,
            newpassword: data.password,
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
  const styleInput = {
    width: "100%",
    borderRadius: "5px",
    outline: "none",
    fontSize: "18px",
    fontWeight: "600",
  };
  const handleInputData = (data) => {
    console.log(data);
    let done = true;
    let post = data;
    if (done) {
      Swal.fire({
        title: "Apa anda yakin?",
        text: "Data akan tersimpan di database",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Simpan data User",
      }).then((result) => {
        if (result.isConfirmed) {
          showLoader();
          axios({
            method: "PUT",
            url: `http://localhost:3004/user/${id}`,
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify(post),
          })
            .then((res) => {
              console.log(res.data);
              getDataUser(res.data.id);
              Swal.fire(
                "Berhasil!",
                "Data User Berhasil Di Tambhakan.",
                "success"
              );
              hideLoader();
              reset();
              // setUser({
              //   username: "",
              //   name: "",
              //   email: "",
              //   level: "",
              //   status: "",
              // });
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
  useEffect(() => {
    getDataUser();
  }, []);
  return (
    <>
      <Container style={{ width: "80%", marginTop: "120px" }}>
        <div className="row">
          <div className="col-md-6 d-flex justify-content-start align-items-start">
            <h1 className="fw-bold fs-4 mb-3">
              <FiUserCheck /> Edit User
            </h1>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          {loader}
        </div>
        <Form
          className="bg-primary rounded-3 p-2"
          onSubmit={handleSubmit(handleInputData)}
        >
          <FormGroup row>
            <Col sm={6} md={6} lg={12}>
              <Label
                for="UserName"
                className="text-start text-light fw-bold me-2 fs-3 text-lowercase"
              >
                Username
              </Label>
            </Col>
            <Col sm={6} md={6} lg={12}>
              <input
                id="UserName"
                name="UserName"
                placeholder="Masukan Username Anda"
                type="text"
                style={styleInput}
                defaultValue={user?.username}
                // onChange={(t) => {
                //   setUser({
                //     ...user,
                //     username: t.target.value,
                //   });
                // }}
                // style={styled}
                {...register("username")}
                className={`form-control ${
                  errors.username?.message ? "is-invalid" : "is-valid"
                }`}
              />
              {errors.username && (
                <p className="fw-bold text-danger">{errors.username.message}</p>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={6} md={6} lg={12}>
              <Label
                for="nama"
                className="text-start text-light fw-bold me-2 fs-3 text-lowercase"
              >
                Your Name
              </Label>
            </Col>
            <Col sm={6} md={6} lg={12}>
              <input
                id="nama"
                name="nama"
                placeholder="Masukan Nama Anda"
                type="text"
                style={styleInput}
                defaultValue={user?.name}
                // {...setValue("name", {
                //   user.name
                // })}
                // setValue("firstName", "Bill")
                // defaultValue={user?.name}
                // onChange={() => {
                //   setValue(user.name);
                // }}

                {...register("name")}
                className={`form-control ${
                  errors.name?.message ? "is-invalid" : "is-valid"
                }`}
                // style={styled}
              />
              {errors.name && (
                <p className="fw-bold text-danger">{errors.name.message}</p>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={6} md={6} lg={12}>
              <Label
                for="email"
                className="text-start text-light fw-bold me-2 fs-3 text-lowercase"
              >
                Email Address
              </Label>
            </Col>
            <Col sm={6} md={6} lg={12}>
              <input
                id="email"
                name="email"
                placeholder="Masukan Email Anda"
                type="email"
                style={styleInput}
                // defaultValue={user?.email}
                // value={user?.email}
                // onChange={(t) => {
                //   setUser({
                //     ...user,
                //     email: t.target.value,
                //   });
                // }}
                // style={styled}
                // {...setValue("email", user.email)}
                {...register("email")}
                className={`form-control ${
                  errors.email?.message ? "is-invalid" : "is-valid"
                }`}
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
                  checked={user?.level === "superadmin"}
                  onClick={() =>
                    setUser({
                      ...user,
                      level: "superadmin",
                    })
                  }
                  className="m-3 p-0"
                  {...register("level")}
                />
                <Label className="fw-bold text-light">Super Admin</Label>
                <input
                  id="level"
                  name="level"
                  type="radio"
                  value="admin"
                  checked={user?.level === "admin"}
                  onClick={() => {
                    setUser({
                      ...user,
                      level: "admin",
                    });
                  }}
                  {...register("level")}
                  className="m-3 p-0"
                />
                <Label className="fw-bold text-light">Admin</Label>
                <input
                  id="level"
                  name="level"
                  type="radio"
                  value="user"
                  checked={user?.level === "user"}
                  onClick={() =>
                    setUser({
                      ...user,
                      level: "user",
                    })
                  }
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
                  checked={user?.status === "aktif"}
                  onClick={() =>
                    setUser({
                      ...user,
                      status: "aktif",
                    })
                  }
                  {...register("status")}
                  className="m-3 p-0"
                />

                <Label className="fw-bold text-light">Aktif</Label>
                <input
                  id="status"
                  name="status"
                  type="radio"
                  value="nonaktif"
                  checked={user?.status === "nonaktif"}
                  onClick={() =>
                    setUser({
                      ...user,
                      status: "nonaktif",
                    })
                  }
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
                className="btn btn-danger px-2"
                size="lg"
                onClick={() => {
                  nav(`${process.env.PUBLIC_URL}/dashboardUser/${layout}`);
                }}
              >
                <FiChevronLeft />
                Cancel
              </Button>
              <Button color="primary" className="px-2 ms-3" size="lg">
                <FiSave className="me-2" />
                Simpan
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    </>
  );
};

export default ManagementUserEdit;
