/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import { BsFillGearFill } from "react-icons/bs";
import Link from "next/link";
import { useSelector } from "react-redux";
import Preloader from "../Preloader/Preloader";
import { useRouter } from "next/router";
import { patchData } from "../../utils/api-client";
import { FaWindowClose } from "react-icons/fa";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const NotiUi = ({
  notifications,
  loader,
  fetchData,
  setShow,
  setNewNoti,
  anchorEl,
  handleClose,
  size,
  setSize
}) => {
  useEffect(() => {
    setNewNoti(true);
  }, []);
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const redirect = async (noti) => {
    const data = await patchData(
      "userApi/notification",
      { id: noti.notification_id },
      auth.token
    );
    if (data.success) {
      router.push(noti.route);
      handleClose()
    }
  };

  return (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <div className="notifi-box" id="box">
        <h2 className="d-flex justify-content-between">
          <div>
            <span className="mr-3" style={{ cursor: "pointer" }}>
              <FaWindowClose onClick={handleClose} />
            </span>{" "}
            Notifications
          </div>
          <div style={{ cursor: "pointer" }}>
            <Link
              href={`/user/${auth.user.user_id}/${auth.user.username}/notification-settings`}
            >
              <a>
                <BsFillGearFill size={20} onClick={handleClose}/>
              </a>
            </Link>
          </div>
        </h2>
        {notifications.length === 0 && !loader ? (
          <p className="d-flex justify-content-center align-items-center mt-5">
            Nothing to show yet!
          </p>
        ) : (
          notifications?.map((noti, index) => (
            <div
              className={
                noti.is_seen == "1"
                  ? "notifi-item p-4 bg-light"
                  : "notifi-item p-4"
              }
              key={index}
            >
              <div className="text" onClick={() => redirect(noti)}>
                <h5></h5>
                <h4>
                  <b>
                    {auth.user.full_name === noti.from_user_full_name
                      ? "You"
                      : noti.from_user_full_name}
                  </b>{" "}
                  {noti.notification_string}
                  <b>{noti.rest_of_the_string}</b>
                </h4>
              </div>
            </div>
          ))
        )}
        {/* {notifications.length !== 0 && ( */}
          <h4
            className="text-warning text-center my-3"
            style={{ cursor: "pointer" }}
            onClick={fetchData}
          >
            {loader ? <Preloader /> : <small>Show More</small>}
          </h4>
        {/* )} */}
      </div>
    </StyledMenu>
  );
};

export default NotiUi;
