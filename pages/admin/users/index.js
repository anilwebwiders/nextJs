import moment from "moment";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { FaUserFriends, FaUserTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import UserData from "../../../component/Admin/Users/UserData";
import Preloader from "../../../component/Preloader/Preloader";
import PreloaderLg from "../../../component/Preloader/PreloaderLg";
import { baseUrl, getFetchData } from "../../../utils/api-client";
import NotFound from "../../404";
const AdminUsers = () => {
  const auth = useSelector((state) => state.auth);
  const [load, setLoad] = useState(false);
  const [active, setActive] = useState(0);
  const [inActive, setInActive] = useState(0);
  const getCount = useCallback(async () => {
    if (auth.token) {
      setLoad(true);
      const data = await getFetchData(`adminApi/users/count`, auth.token);
      setActive(data.active);
      setInActive(data.inActive);
      setLoad(false);
    }
  }, [auth]);

  useEffect(() => {
    getCount();
  }, [getCount]);
  //Download
  const [downloadLoad, setDownloadLoad] = useState(false);
  const downloadFile = () => {
    setDownloadLoad(true);
    fetch(`${baseUrl}/api/adminApi/users/download`, {
      headers: {
        authorization: auth.token,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
     
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `FNMotivation Users Data (${moment(new Date()).format(
          "MM-DD-YYYY"
        )}).xlsx`; // Here I want to get rid of hardcoded value instead I want filename from server
        link.click();
        link.remove(); //  Probably needed to remove html element after downloading?
        setDownloadLoad(false);
      });
  };
  if (auth.loading) return <PreloaderLg />;
  if (auth.user.role === "admin") {
    return (
      <div>
        <div className="text-center">
          <h1>All Users</h1>

          <div className="d-flex justify-content-center p-3">
            <h3 className="admin-box-active bg-success">
              <FaUserFriends color="white" className="m-2" /> Active:{" "}
              {load ? <Preloader /> : active}
            </h3>
            <h3 className="admin-box-inactive bg-danger">
              <FaUserTimes color="white" className="m-2" /> Inactive:{" "}
              {load ? <Preloader /> : inActive}
            </h3>
          </div>

          <div className="text-center">
            <b>Export User Data:</b>

            {downloadLoad ? (
              <button disabled className="bg-warning text-white btn ml-2">
                Processing
              </button>
            ) : (
              <button
                className="bg-warning text-white btn ml-2"
                onClick={downloadFile}
              >
                Download
              </button>
            )}
          </div>

          <UserData getCount={getCount} />
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default AdminUsers;
