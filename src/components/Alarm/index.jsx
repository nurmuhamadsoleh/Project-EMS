import React, { useEffect, useMemo, useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import useFullPageLoader from "../hooks/useFullPageLoader";
import axios from "axios";
import Swal from "sweetalert2";
import { PaginationComponent, Search, TableHeader } from "../DataTables";
import { classes } from "../../data/layouts";
import { FiSearch, FiPrinter, FiBell } from "react-icons/fi";

const Alarm = () => {
  const [comments, setComments] = useState([]);
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const ITEMS_PER_PAGE = 10;
  const headers = [
    { name: "No", field: "id", sortable: false },
    { name: "Alarm_Type", field: "alarmtype", sortable: true },
    { name: "ID_Meter", field: "idmeters", sortable: true },
    { name: "Nama_Group_Sub", field: "namagroup", sortable: true },
    { name: "Alarm_Log", field: "alarmlog", sortable: false },
    { name: "Date_Time", field: "datetime", sortable: false },
    { name: "Created", field: "created", sortable: false },
    { name: "Upload", field: "upload", sortable: false },
  ];
  const getData = async () => {
    showLoader();
    await axios({
      url: "http://localhost:3004/alarm",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      data: {},
    })
      .then((res) => {
        console.log(res.data);
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
  useEffect(() => {
    getData();
  }, []);
  const commentsData = useMemo(() => {
    let computedComments = comments;

    if (search) {
      computedComments = computedComments.filter(
        (comment) =>
          comment.alarmtype.toLowerCase().includes(search.toLowerCase()) ||
          comment.idmeters.toLowerCase().includes(search.toLowerCase()) ||
          comment.namagroup.toLowerCase().includes(search.toLowerCase())
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
        <div className="col mb-3">
          <div className="row">
            <div className="col-md-6 d-flex justify-content-start align-items-start">
              <h1 className="fw-bold fs-3 ms-3">
                <FiBell /> Alarm Hsitory
              </h1>
            </div>
            <Col className="col-sm-6 text-end mb-3 px-3">
              <Button color="primary">
                <FiSearch /> Alarm Today
              </Button>
            </Col>
          </div>
          <Container fluid>
            <Row>
              <Col className="col-sm-3 d-flex me-auto ms-2 mb-2">
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
              <table className="table table-success text-center table-bordered mt-1 ms-3">
                <TableHeader
                  headers={headers}
                  onSorting={(field, order) => setSorting({ field, order })}
                />
                <tbody>
                  {commentsData.map((comment, key) => (
                    <tr className="table-active">
                      <th scope="row" key={comment.id}>
                        {key + 1}
                      </th>
                      <td className="table-active">{comment.id}</td>
                      <td className="table-active">{comment.idmeters}</td>
                      <td className="table-active">{comment.namagroup}</td>
                      <td className="table-active">{comment.alarmlog}</td>
                      <td className="table-active">{comment.datetime}</td>
                      <td className="table-active">{comment.created}</td>
                      <td className="table-active">{comment.upload}</td>
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

export default Alarm;
