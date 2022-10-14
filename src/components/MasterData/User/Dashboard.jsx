import React, { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TableHeader, PaginationComponent, Search } from "../../DataTables";
import { Button, Container, Row, Col } from "reactstrap";
import useFullPageLoader from "../../hooks/useFullPageLoader";

const DataTable = () => {
  const nav = useNavigate();
  const [comments, setComments] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const ITEMS_PER_PAGE = 50;

  const headers = [
    { name: "No", field: "id", sortable: false },
    { name: "Nama", field: "name", sortable: true },
    { name: "Email", field: "email", sortable: true },
    { name: "Alamat", field: "address", sortable: false },
    { name: "Aksi", field: "Aksi", sortable: false },
  ];
  const getData = async () => {
    showLoader();
    await axios({
      url: "http://localhost:3000/karyawan",
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
          url: `http://localhost:3000/karyawan/${id}`,
          headers: {
            "Content-Type": "application/json",
          },
          data: {},
        })
          .then((res) => {
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
    nav(`/editemploye/${id}`);
  };
  const handleAdd = () => {
    nav(`/addemploye`);
  };
  useEffect(() => {
    getData();
  }, []);
  //   useEffect(() => {
  //     const getData = () => {
  //       showLoader();

  //       fetch("https://jsonplaceholder.typicode.com/comments")
  //         .then((response) => response.json())
  //         .then((json) => {
  //           hideLoader();
  //           setComments(json);
  //           console.log(json);
  //         });
  //     };

  //     getData();
  //   }, []);

  const commentsData = useMemo(() => {
    let computedComments = comments;

    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.name.toLowerCase().includes(search.toLowerCase()) ||
          comment.email.toLowerCase().includes(search.toLowerCase()) ||
          comment.address.toLowerCase().includes(search.toLowerCase())
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
      <div className="row w-100 mt-4">
        <div className="col mb-3">
          <div className="row">
            <div className="col-md-6 d-flex justify-content-start align-items-start">
              <h1 className="fw-bold fs-3 ms-2">Meter Group</h1>
            </div>
            <div className="col-md-6 d-flex justify-content-end align-items-end">
              <Search
                onSearch={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <Container fluid>
            <Row className="d-flex">
              <Col className="col-sm-12 text-end mb-3 px-3">
                <Button color="primary" onClick={handleAdd}>
                  Tambah
                </Button>
              </Col>
              <table className="table table-dark text-center">
                <TableHeader
                  headers={headers}
                  onSorting={(field, order) => setSorting({ field, order })}
                />
                <tbody>
                  {commentsData.map((comment) => (
                    <tr className="table-active">
                      <th scope="row" key={comment.id}>
                        {comment.id}
                      </th>
                      <td className="table-active">{comment.name}</td>
                      <td className="table-active">{comment.email}</td>
                      <td className="table-active w-25">{comment.address}</td>
                      <td className="table-active">
                        <div className="row">
                          <div className="col-sm-6">
                            <Button
                              color="primary"
                              size="sm"
                              className="me-1 px-3"
                              onClick={() => handleEdit(comment.id)}
                            >
                              Edit
                            </Button>
                          </div>
                          <div className="col-sm-6">
                            <Button
                              className="btn btn-danger px-2"
                              size="sm"
                              onClick={() => onClickDelete(comment.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </td>
                      {/* <td className="table-active"></td> */}
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

export default DataTable;
