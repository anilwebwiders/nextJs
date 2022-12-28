/* eslint-disable @next/next/no-img-element */
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData, getFetchData, patchData } from "../../../utils/api-client";
import Preloader from "../../Preloader/Preloader";
import Link from "next/link";
import Paginate from "../../Paginate/Paginate";
import { notifyError } from "../../../store/notify/action";
import DeleteModal from "../../Modal/Delete/DeleteModal";

const UserData = ({ getCount }) => {
  const token = useSelector((state) => state.auth.token);
  const [page, setPage] = useState(0);
  const fetchDataInfo = () => {
    setPage(page + 12);
  };
  const [loader, setLoader] = useState(false);
  const [order, setOrder] = useState("DESC");
  const [status, setStatus] = useState(1);
  const [data, setData] = useState([]);
  const handleStatus = (data) => {
    setPage(0);
    setData([]);
    setOrder(data);
  };
  const handleOrder = (data) => {
    setPage(0);
    setData([]);
    setStatus(data);
  };
  const get = useCallback(async () => {
    setLoader(true);
    const users = await getFetchData(
      `adminApi/users?status=${status}&order=${order}&page=${page}`,
      token
    );
    console.log(users)
    setData([...data, ...users]);
    setLoader(false);
  }, [page, order, status]);

  useEffect(() => {
    get();
  }, [get]);

  //Ban User
  const [value, setValue] = useState(null);
  const [banLoader, setBanLoader] = useState(null);
  const banUser = async (id) => {
    setBanLoader(id);
    const data = await patchData(`adminApi/users`, { value, id }, token);
    if (data.success) {
      get();
      getCount();
      setBanLoader(null);
    }
  };

  //Search
  const [searcPage, setSearchPage] = useState(0);
  const [searchTxt, setSearchTxt] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchDataCount, setSearchDataCount] = useState([]);
  const handleSearch = async (e) => {
    setSearchTxt(e.target.value);
  };
  const getSearch = useCallback(async () => {
    const delayDebounce = setTimeout(async () => {
      setLoader(true);
      const usersSearch = await getFetchData(
        `adminApi/users/search?status=${status}&order=${order}&search=${searchTxt}&page=${searcPage}`,
        token
      );
      setSearchData(usersSearch.users);
      setSearchDataCount(usersSearch.count);
      setLoader(false);
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [searcPage, order, status, searchTxt]);

  useEffect(() => {
    getSearch();
  }, [getSearch]);
  //Paination
  const pageCount = Math.ceil(searchDataCount / 12);
  const fetchData = (page) => {
    setSearchPage(page.selected + 1);
  };

  const dispatch = useDispatch();

  //Delete a user
  const auth = useSelector((state) => state.auth)
  const [modalDelete, setModalDelete] = useState(false);
  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);
  const toggleDelete = (id, data) => {
    setModalDelete(!modalDelete);
    setId(id);
    setTitle(data);
  };

  return (
    <>
      <DeleteModal
        toggleDelete={toggleDelete}
        modalDelete={modalDelete}
        auth={auth}
        title={title}
        type={"user"}
        url={`userApi/${id}`}
        redirect={get}
        redirectTwo={getSearch}
      />
      <div className="d-flex justify-content-center">
        <div className="profile-posts-view mt-5">
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Search Posts"
              onChange={handleSearch}
            />
            <a>
              <img src="/search-icon.svg" alt="searchicon" />
            </a>
          </form>
        </div>
      </div>
      Add User:{" "}
      <Link href="/admin/users/add">
        <a>
          <button className="bg-primary text-white btn ml-2">Add User</button>
        </a>
      </Link>
      <table className="table table-data mt-5">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Audience</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">DOB</th>
            <th scope="col">Avatar</th>
            <th scope="col">
              <select
                name="status"
                onChange={(e) => handleStatus(e.target.value)}
              >
                <option className="text-success" value="DESC">
                  Recent
                </option>
                <option className="text-danger" value="ASC">
                  Earliest
                </option>
              </select>
            </th>
            <th scope="col">Method</th>
            <th scope="col">
              <select
                name="status"
                onChange={(e) => handleOrder(e.target.value)}
              >
                <option className="text-success" value="1">
                  Active
                </option>
                <option className="text-danger" value="0">
                  In Active
                </option>
              </select>
            </th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        {searchTxt.length === 0 ? (
          <tbody>
            {data.map((user, idx) => (
              <tr key={idx}>
                <td>{user.user_id}</td>
                <Link href={"/user/" + user.user_id + "/" + user.username}>
                  <a>
                    <td>{user.full_name}</td>
                  </a>
                </Link>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.gender ? user.gender : "NA"}</td>
                <td>{user.dob ? user.dob : "NA"}</td>
                <td>
                  <img
                    src={user.avatar}
                    alt="userAvatar"
                    className="img-fluid"
                    width="50"
                    height="50"
                  />
                </td>
                <td>
                  {moment(user.created_at.split("T")[0]).format("MM/DD/YY")}
                </td>
                <td>
                  {user.facebook_id.length > 3 && "Facebook"} {user.google_id.length > 3 && "Gmail"} {user.apple_id.length > 3 && 'Apple'}
                  {user.google_id.length > 3 && user.facebook_id.length > 3 && user.apple_id.length > 3 && "Email"}
                </td>
                <td>
                  {banLoader === user.user_id ? (
                    "...processing..."
                  ) : (
                    <div className="dropdown">
                      <select
                        className="btn btn-outlined-danger"
                        name="status"
                        onClick={(e) => setValue(e.target.value)}
                        onChange={() => banUser(user.user_id)}
                      >
                        <option
                          selected={user.status == "1"}
                          className="text-success"
                          value="0"
                        >
                          Active
                        </option>
                        <option
                          selected={user.status == "0"}
                          className="text-danger"
                          value="1"
                        >
                          Deactive
                        </option>
                      </select>
                    </div>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => toggleDelete(user.user_id, user.full_name)}
                  >
                    {id == user.user_id ? "..loading.." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            {searchData.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <Link href={"/user/" + user.user_id + "/" + user.username}>
                  <a>
                    <td>{user.full_name}</td>
                  </a>
                </Link>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.gender ? user.gender : "NA"}</td>
                <td>{user.dob ? user.dob : "NA"}</td>
                <td>
                  <img
                    src={user.avatar}
                    alt="userAvatar"
                    className="img-fluid"
                    width="50"
                    height="50"
                  />
                </td>
                <td>
                  {moment(user.created_at.split("T")[0]).format("MM/DD/YY")}
                </td>
                <td>
                  {user.facebook_id && "Facebook"} {user.google_id && "Gmail"}{" "}
                  {!user.google_id && !user.facebook_id && "Email"}
                </td>
                <td>
                  {banLoader === user.user_id ? (
                    "...processing..."
                  ) : (
                    <div className="dropdown">
                      <select
                        className="btn btn-outlined-danger"
                        name="status"
                        onClick={(e) => setValue(e.target.value)}
                        onChange={() => banUser(user.user_id)}
                      >
                        <option
                          selected={user.status == "1"}
                          className="text-success"
                          value="0"
                        >
                          Active
                        </option>
                        <option
                          selected={user.status == "0"}
                          className="text-danger"
                          value="1"
                        >
                          Deactive
                        </option>
                      </select>
                    </div>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => toggleDelete(user.user_id, user.full_name)}
                  >
                    {id == user.user_id ? "..loading.." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {searchTxt.length === 0 ? (
        <h4
          className="text-warning text-center my-4"
          style={{ cursor: "pointer" }}
          onClick={fetchDataInfo}
        >
          {loader ? <Preloader /> : "Show More"}
        </h4>
      ) : (
        <>
          <h4
            className="text-warning d-flex justify-content-center text-center my-4"
            style={{ cursor: "pointer" }}
          >
            {loader && <Preloader />}
          </h4>
          <Paginate pageCount={pageCount} fetchData={fetchData} />
        </>
      )}
    </>
  );
};

export default UserData;
