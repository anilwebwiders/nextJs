/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Modal } from "reactstrap";
import { patchData, postData } from "../../utils/api-client";
import Cookie from "js-cookie";
import { browserName, CustomView } from "react-device-detect";

const Accept = ({ modalAccept, toggleAccept, auth, title }) => {
  const logOut = () => {
    Cookie.remove("user_id");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("loggedIn");
    window.location = "/login";
  };

  const [load, setLoad] = useState(false);
  const handleSubmit = async () => {
    setLoad(true);
    const data = await patchData(
      "userApi/delete",
      {
        user_id: auth.user.user_id,
        full_name: auth.user.full_name,
        email: auth.user.email,
      },
      auth.token
    );
    setLoad(false);
    if (data.err) {
      dispatch(notifyError(data.err));
      localStorage.removeItem("loggedIn");
    }
    if (data.success) return logOut();
    if (data.success) dispatch(notifySuccess("Successfully Deleted"));
  };

  return (
    <Modal isOpen={modalAccept} toggle={toggleAccept}>
      <div className="categories-modal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hcommunity_idden="true" onClick={toggleAccept}>
                  <img src="/closs-icon.svg" alt="close" />
                </span>
              </button>

              <h3>{title}</h3>
              <p className="mt-3">
                This new social network is a unique platform that is centered
                around health and wellness. This platform will provide a central
                location for people to like-minded people to connect.{" "}
              </p>
              <p className="mt-3 text-warning">
                Do you really Want to delete your profile?
              </p>
              {load ? (
                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="btn btn-warning pl-5 pr-5"
                    data-dismiss="modal"
                    onClick={handleSubmit}
                  >
                    Loading
                  </button>
                </div>
              ) : (
                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="btn btn-danger pl-5 pr-5"
                    data-dismiss="modal"
                    onClick={handleSubmit}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="btn btn-success pl-5 pr-5 ml-3"
                    onClick={toggleAccept}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Accept;
