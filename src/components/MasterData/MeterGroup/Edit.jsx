import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { classes } from "../../../data/layouts";
// import { FiSave, FiChevronLeft } from "react-icons/fi";
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
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useForm } from "react-hook-form";

// const styled = {
//   borderRadius: "4px",
//   width: "100%",
//   outline: "none",
//   border: "none",
//   height: "35px",
//   width: "100%",
// };

const MeterGroupEdit = () => {
  // const iniState = {
  //   meterGroupID: "",
  //   meterGroupName: "",
  // };
  // const [initialValues, setInitialValue] = useState(iniState);
  // const validationSchema = yup
  //   .object({
  //     meterGroupID: yup
  //       .string()
  //       .required("Field ID Meter Group Wajib di isi")
  //       .min(3, "Minimal 3 Karakter"),
  //     meterGroupName: yup
  //       .string()
  //       .required("Field ID Meter Group Wajib di isi")
  //       .min(5, "Minimal 5 Karakter"),
  //   })
  //   .required();
  // // const handleSubmitData = (data) => {
  // //   console.log(data);
  // // };
  // const {
  //   register,
  //   watch,
  //   reset,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   mode: "onTouched",
  //   reValidateMode: "onChange",
  //   defaultValues: initialValues,
  //   resolver: yupResolver(validationSchema),
  // });
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();
  let { id } = useParams();
  const nav = useNavigate();
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [update, setUpdate] = useState({
    meterGroupID: "",
    meterGroupName: "",
  });
  const getDataKaryawan = async () => {
    showLoader();
    await axios({
      method: "GET",
      url: `http://localhost:3004/meter/${id}`,
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
            meterGroupID: data.meterGroupID,
            meterGroupName: data.meterGroupName,
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
        confirmButtonText: "Ya, Simpan Meter Group",
      }).then((result) => {
        if (result.isConfirmed) {
          showLoader();
          axios({
            method: "PUT",
            url: `http://localhost:3004/meter/${id}`,
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
                name: "",
                email: "",
                address: "",
              });
              // reset();
              nav(`${process.env.PUBLIC_URL}/dasboardgroup/${layout}`);
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
                value={update.meterGroupID}
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
          <Button type="button" color="primary" onClick={handleInputData}>
            Update
          </Button>
        </div>
      </Form>
      {loader}
    </Container>
    // <Container
    //   className="bg-primary py-5 rounded"
    //   style={{ width: "80%", marginTop: "130px" }}
    // >
    //   <Form onSubmit={handleSubmit(handleInputData)}>
    //     <FormGroup row>
    //       <Label
    //         for="Meter Group ID"
    //         sm={3}
    //         className="text-start text-light fw-bold me-2"
    //       >
    //         Meter Group ID
    //       </Label>
    //       <Col sm={8}>
    //         <input
    //           type="text"
    //           name="metergroup"
    //           placeholder="Meter Group"
    //           style={styled}
    //           {...register("idmetergroup")}
    //         />
    //         {errors?.meterGroupID && (
    //           <p className="fw-bold text-danger">
    //             {errors?.meterGroupID.message}
    //           </p>
    //         )}
    //       </Col>
    //     </FormGroup>
    //     <FormGroup row>
    //       <Label
    //         for="Meter Group ID"
    //         sm={3}
    //         className="text-start text-light fw-bold me-2"
    //       >
    //         Meter Group Nama
    //       </Label>
    //       <Col sm={8}>
    //         <input
    //           type="text"
    //           name="namametergroup"
    //           placeholder="Nama Meter Group"
    //           {...register("namametergroup")}
    //           style={styled}
    //         />
    //         {errors?.meterGroupName && (
    //           <p className="fw-bold text-danger">
    //             {errors?.meterGroupName.message}
    //           </p>
    //         )}
    //       </Col>
    //     </FormGroup>
    //     <FormGroup check row>
    //       <Col className="col-sm-12 d-flex justify-content-center mt-5">
    //         <Button
    //           color="danger"
    //           size="lg"
    //           className="me-3 rounded text-black"
    //           onClick={() => {
    //             nav("/dasboardgroup/:layout/:id");
    //           }}
    //         >
    //           <FiChevronLeft className="fs-2" /> cancel
    //         </Button>
    //         <Button
    //           color="primary"
    //           size="lg"
    //           className="me-3 rounded text-black"
    //         >
    //           <FiSave className="fs-2" /> save
    //         </Button>
    //       </Col>
    //     </FormGroup>
    //   </Form>
    //   {loader}
    // </Container>
  );
};

export default MeterGroupEdit;
