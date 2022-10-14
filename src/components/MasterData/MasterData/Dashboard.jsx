import React, { useState, useEffect, useMemo } from "react";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import { Button, Container, Row, Col } from "reactstrap";
import { FiUser, FiPlus, FiTrash, FiEdit2, FiZap } from "react-icons/fi";
import { PaginationComponent, Search, TableHeader } from "../../DataTables";
import { classes } from "../../../data/layouts";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const MasterData = () => {
  const nav = useNavigate();
  const [comments, setComments] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const ITEMS_PER_PAGE = 10;
  const headers = [
    { name: "No", field: "id", sortable: false },
    { name: "ID", field: "ID", sortable: false },
    { name: "Type", field: "type", sortable: false },
    { name: "Serial", field: "serial", sortable: false },
    { name: "Name", field: "name", sortable: true },
    { name: "Group", field: "group", sortable: true },
    { name: "Location", field: "location", sortable: true },
    { name: "Power", field: "power", sortable: false },
    { name: "V Nominal", field: "vnominal", sortable: false },
    { name: "I Nominal", field: "lnominal", sortable: false },
    { name: "Aksi", field: "Aksi", sortable: false },
  ];
  const getData = async () => {
    showLoader();
    await axios({
      url: "http://localhost:3004/masterdata",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          let data = res.data;
          setComments(data);
          hideLoader();
        }
        Swal.fire("sucess", "Data Berhasil Di Tampilkan", "success");
      })
      .catch((err) => {
        console.log(err);
        hideLoader();
        Swal.fire("Sorry", "Data Gagal Di Tampilkan", "error");
      });
  };
  const onClickDelete = (id) => {
    console.log("idnya", id);
    Swal.fire({
      title: "Apa anda yakin?",
      text: "Apakah ada yakin ingin menghapus data ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        showLoader();
        axios({
          method: "DELETE",
          url: `http://localhost:3004/masterdata/${id}`,
          headers: {
            "Content-Type": "application/json",
          },
          data: {},
        })
          .then((res) => {
            console.log(res);
            Swal.fire("Berhasil!", "Data berhasil di hapus.", "success");
            getData();
            hideLoader();
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(
              "Peringatan!",
              "Terjadi kesalahan saat menghapus data",
              "warning"
            );
            hideLoader();
          });
      }
    });
  };
  const handleEdit = (id) => {
    console.log("id", id);
    nav(`${process.env.PUBLIC_URL}/masterdataedit/${layout}/${id}`);
  };
  const handleAdd = () => {
    nav(`${process.env.PUBLIC_URL}/masterdataadd/${layout}`);
  };
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();

  useEffect(() => {
    getData();
  }, []);
  const commentsData = useMemo(() => {
    let computedComments = comments;

    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.name.toLowerCase().includes(search.toLowerCase()) ||
          comment.group.toLowerCase().includes(search.toLowerCase()) ||
          comment.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedComments.length);

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedComments.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [comments, currentPage, search, sorting]);
  return (
    <>
      <div
        className="row w-100"
        style={{
          marginTop: "80px",
          paddingTop: "50px",
          // backgroundColor: "red",
        }}
      >
        <div className="col">
          <div className="row mb-5">
            <div className="col-md-6 d-flex justify-content-start align-items-start">
              <h1 className="fw-bold fs-3 ms-3">
                <FiZap /> Master data
              </h1>
            </div>
            <Col className="col-sm-6 text-end mb-3 px-3">
              <Button color="primary" onClick={handleAdd}>
                <FiPlus /> Tambah
              </Button>
            </Col>
          </div>

          <Container fluid>
            <Row>
              <Col className="col-sm-3 d-flex me-auto ms-2 mb-4">
                <Button
                  color="warning"
                  outline={true}
                  size="sm"
                  className="me-3 py-1 px-2"
                >
                  Export PDF
                </Button>
                <Button
                  color="warning"
                  outline={true}
                  size="sm"
                  className="py-1 px-2"
                >
                  Export Excel
                </Button>
              </Col>
              <Col className="col-sm-3 d-flex ms-auto">
                <Search
                  onSearch={(value) => {
                    setSearch(value);
                    setCurrentPage(1);
                  }}
                />
              </Col>
            </Row>
            <Row className="d-flex">
              <table className="table table-success text-center table-bordered ms-3">
                <TableHeader
                  headers={headers}
                  onSorting={(field, order) => setSorting({ field, order })}
                />
                <tbody>
                  {commentsData.map((comment, index) => (
                    <tr className="table-active">
                      <th scope="row" key={index}>
                        {comment.id + 1}
                      </th>
                      <td className="table-active">{comment.ID}</td>
                      <td className="table-active">{comment.type}</td>
                      <td className="table-active">{comment.serial}</td>
                      <td className="table-active">{comment.name}</td>
                      <td className="table-active">{comment.group}</td>
                      <td className="table-active">{comment.location}</td>
                      <td className="table-active">{comment.power}</td>
                      <td className="table-active">{comment.vnominal}</td>
                      <td className="table-active">{comment.lnominal}</td>
                      <td className="table-active">
                        <div className="row">
                          <div className="col-sm-6">
                            <Button
                              color="primary"
                              size="sm"
                              className="me-1 px-3"
                              onClick={() => handleEdit(comment.id)}
                            >
                              <FiEdit2 /> Edit
                            </Button>
                          </div>
                          <div className="col-sm-6">
                            <Button
                              className="btn btn-danger px-2"
                              size="sm"
                              onClick={() => onClickDelete(comment.id)}
                            >
                              <FiTrash /> Delete
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="col-sm-12 d-flex justify-content-end align-items-end">
                <PaginationComponent
                  total={totalItems}
                  itemsPerPage={ITEMS_PER_PAGE}
                  currentPage={currentPage}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </Row>
          </Container>
        </div>
      </div>
      {loader}
    </>
  );
};
export default MasterData;
