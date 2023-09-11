import React, { useEffect, useState } from "react";
import { useContextData } from "../../context/UsersContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import TextField from "@mui/material/TextField";
import { escapeRegExp, isEmpty } from "lodash";
import { Modal } from "antd";
import Pagination from "@mui/material/Pagination";

const DisplayUser = () => {
  const { users, deleteUser } = useContextData();
  const [search, setSearch] = useState("");
  const [filteredUser, setFilteredUser] = useState(users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(1);

  let pageNo = searchParams.get("pageNo");



  useEffect(() => {
    const escapedSearch = escapeRegExp(search);
    console.log(escapedSearch);
    const regex = new RegExp(escapedSearch, "i"); // "i" flag for case-insensitive matching
    const result = users.filter((val) => {
      return val["name"].match(regex);
    });
    setFilteredUser(result);
  }, [search, users]);

  useEffect(()=>{
    if(isEmpty(pageNo)){
      setSearchParams({"pageNo": 1});
    }else{
      setPage(pageNo)
    }
  },[])

  useEffect(() => {
    if (!isEmpty(id)) {
      setIsModalOpen(true);
    }
  }, [id]);

  useEffect(()=>{
    if(!isEmpty(pageNo)){

    }
  })

  const handleChange = (event, value) => {
    setPage(value);
    setSearchParams({ "pageNo": value})
  };


  const columns = [
    {
      name: <h4>Index</h4>,
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: <h4>Name</h4>,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: <h4>email</h4>,
      selector: (row) => row.email,
      sortable: true,
      width: "230px",
    },
    {
      name: <h4>Profile Image</h4>,
      selector: (row) => <img src={row.pic} height={100} width={150} alt="" />,
      sortable: true,
    },
    {
      name: <h4>Actions</h4>,
      selector: (row) => (
        <>
          <img
            src="/delete.png"
            alt=""
            height={35}
            width={35}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/user/delete/${row.id}`)}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <img
            src="/edit2.png"
            alt=""
            height={35}
            width={35}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/user/edit/${row.id}`)}
          />
        </>
      ),
      sortable: true,
    },
  ];

  const handleOk = () => {
    deleteUser(+id);
    setIsModalOpen(false);
    navigate("/user");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    navigate("/user");
  };

  return (
    <div className="content__container">
      {!isEmpty(id) && (
        <Modal
          title="Delete"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="delete__modal">
            <br />
            <img src={users[id - 1].pic} alt="" height={100} width={150} />
            <br />
            <label>
              Name: <strong>{users[id - 1].name}</strong>
            </label>
            <br />
            <label>
              Email: <strong>{users[id - 1].email}</strong>
            </label>
          </div>
          <br />
          <br />
          <p style={{ color: "red" }}>
            Are you sure you want to delete record?
          </p>
        </Modal>
      )}

      <div className="user__header">
        <h1>Users</h1>
        <button className="button-17" onClick={() => navigate("/user/add")}>
          Add new user
        </button>
      </div>
      <div className="data__table">
        <DataTable
          columns={columns}
          data={filteredUser.slice(((+page) * 5) - 5, page * 5)}
          // pagination
          paginationDefaultPage={2}
          highlightOnHover
          subHeader
          subHeaderComponent={
            <TextField
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              label="Search here"
              variant="standard"
            />
          }
          subHeaderAlign="left"
        />
      </div>
      <div style={{ display: "flex", margin: "auto", justifyContent:"center",alignItems:"center" }}>
        <Pagination count={Math.ceil(filteredUser.length/5)} page={page} onChange={handleChange} />
      </div>
    </div>
  );
};

export default DisplayUser;