import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { FiSave, FiChevronRight, FiUser } from "react-icons/fi";
import { yupResolver } from "@hookform/resolvers/yup";
import "./ResetUser.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { classes } from "../../../data/layouts";
import axios from "axios";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Swal from "sweetalert2";
import {
  Form,
  Label,
  FormGroup,
  Container,
  Button,
  Col,
  Row,
} from "reactstrap";

const ForgoutPassword = () => {
  let [showPass, setShowPass] = useState(false);
  let [showPassConfirm, setShowPassConfirm] = useState(false);
  let [newShowPass, setNewShowPass] = useState(true);

  // Validasri react Hook from
  const initState = {
    username: "",
    password: "",
    confirmpassword: "",
  };
  const [initialValues, setInitalValue] = useState(initState);
  const validationSchema = yup.object({
    username: yup
      .string()
      .matches(/^[A-Za-z ,.'-]+$/i, "Wajib Alfabet")
      .required("Fild Nama Wajib di isi")
      .min(5, "minimal 5 charcter yang di input")
      .lowercase("Harus Lowercase"),
    password: yup
      .string()
      .required("Password Wajib Di isi")
      .min(6, "Password minimal 6 charater"),
    confirmpassword: yup
      .string()
      .required("Password Wajib Di isi")
      .oneOf([yup.ref("password")], "Password Tidak Sama!"),
  });
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });
  const handleError = (error) => {
    console.log("ERORR:::");
  };
  // ref untuk password field
  let password = useRef();
  let PasswordNew = useRef();
  console.log(password);
  // console.log(password.Type);
  // function change password type to text
  const viewPassword = () => {
    setShowPass(!showPass);
    let passwordField = password.current.type;

    if (passwordField === "password") {
      password.current.type = "text";
      return;
    }
    password.current.type = "password";
  };
  const viewPasswordNew = () => {
    setNewShowPass(!newShowPass);
    let passwordField2 = PasswordNew.current.type;
    if (passwordField2 === "password") {
      return (PasswordNew.current.type = "text");
    }
    PasswordNew.current.type = "password";
  };
  const nav = useNavigate();
  let { id } = useParams();
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  const [loader, showLoader, hideLoader] = useFullPageLoader();

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
            method: "POST",
            url: `http://localhost:3004/user`,
            headers: {
              "Content-Type": "application/json",
            },
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
              reset();
              nav(
                `${process.env.PUBLIC_URL}/dashboard/metersbygroup/${layout}`
              );
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
  const styleInput = {
    width: "100%",
    borderRadius: "5px",
    outline: "none",
    fontSize: "18px",
    fontWeight: "600",
  };
  return (
    <>
      <Container style={{ width: "80%", marginTop: "120px" }}>
        <div className="row">
          <div className="col-md-6 d-flex justify-content-start align-items-start">
            <h1 className="fw-bold fs-4 mb-3">
              <FiUser /> Add User
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
            <Col>
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
                {...register("username")}
                className={`form-control ${
                  errors.username?.message ? "is-invalid" : "is-valid"
                }`}
                // onChange={(t) => {
                //   setUser({
                //     ...user,
                //     username: t.target.value,
                //   });
                // }}

                // style={styled}
                // {...register("username")}
              />
              <div className="invalid-feedback">{errors.username?.message}</div>
            </Col>
            {/* {errors.username && (
                <p className="fw-bold text-danger">{errors.username.message}</p>
              )} */}
          </FormGroup>
          <FormGroup row>
            <Col sm={6} md={6} lg={12}>
              <Label
                htmlFor="Passwordlama"
                className="text-start text-light fw-bold me-2 fs-3 text-lowercase"
              >
                Password
              </Label>
            </Col>
            <Col sm={6} md={6} lg={12}>
              <input
                id="Passwordlama"
                name="Passwordlama"
                placeholder="Masukan Password Lama"
                type={showPass ? "text" : "password"}
                style={styleInput}
                // ref={password}
                {...register("password")}
                className={`form-control ${
                  errors.password?.message ? "is-invalid" : "is-valid"
                }`}
                // onChange={(e) => {
                //   setUser({
                //     ...user,
                //     password: e.target.value,
                //   });
                // }}
                // style={styled}
                // {...register("username")}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
              <span onClick={() => setShowPass(!showPass)}>
                {!showPass ? (
                  <FiEye className="eye-password" />
                ) : (
                  <FiEyeOff className="eye-password" />
                )}
              </span>

              {/* <i
                className={
                  showPass
                    ? "eye-password fa fa-eye-slash"
                    : "eye-password fa fa-eye"
                }
                onClick={() => setShowPass(!showPass)}
              /> */}
            </Col>
            {/* {errors.password && <p>{errors.password.message}</p>} */}
          </FormGroup>
          <FormGroup row>
            <Col sm={6} md={6} lg={12}>
              <Label
                htmlFor="NewPassword"
                className="text-start text-light fw-bold me-2 fs-3 text-lowercase"
              >
                Konfirmasi Password
              </Label>
            </Col>
            <Col sm={6} md={6} lg={12}>
              <input
                id="NewPassword"
                name="NewPassword"
                placeholder="Masukan Password Baru"
                type="password"
                style={styleInput}
                ref={PasswordNew}
                {...register("confirmpassword")}
                className={`form-control ${
                  errors.confirmpassword?.message ? "is-invalid" : "is-valid"
                }`}
                // onChange={(t) => {
                //   setUser({
                //     ...user,
                //     newpassword: t.target.value,
                //   });
                // }}
              />
              <div className="invalid-feedback">
                {errors.confirmpassword?.message}
              </div>
              {newShowPass ? (
                <FiEye className="eye-password" onClick={viewPasswordNew} />
              ) : (
                <FiEyeOff className="eye-password" onClick={viewPasswordNew} />
              )}
            </Col>
            {/* {errors.confirmpassword && <p>{errors.confirmpassword.message}</p>} */}
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
                Cancel
                <FiChevronRight />
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
export default ForgoutPassword;
