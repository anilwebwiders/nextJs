/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "reactstrap";
import {
  notifySuccess,
} from "../../../store/notify/action";
import { postData } from "../../../utils/api-client";
import { validPass } from "../../../utils/valid";
const ChangePassword = ({ modal, toggle, setLoadPass, loadPass }) => {
  useEffect(() => {
    setError(null);
  }, []);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const auth = useSelector(state=> state.auth)
  const [userData, setUserData] = useState([]);
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const check = validPass(userData.new_password, userData.cf_password)
    if (check) return setError(check);

    const post = {
      user_id: auth.user.user_id,
      old_password: userData.old_password,
      new_password: userData.new_password,
      email : auth.user.email
    };
    setLoadPass(true);
    const data = await postData(`userApi/password/change`, post, auth.token);
    setLoadPass(false);
    if (data.err) return setError(data.err);
    toggle();
    if (data.success) return dispatch(notifySuccess(data.success));
  };
  return (
    <Modal isOpen={modal} toggle={toggle}>
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
                <span aria-hcommunity_idden="true" onClick={toggle}>
                  <img src="/closs-icon.svg" alt="close" />
                </span>
              </button>

              {/* Form */}
              <div className="register-sec contact-us">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <div className="login-inner">
                        <div className="login-title mb-5"></div>

                        {/* Reset Form */}
                        {error && (
                          <div
                            className="alert alert-danger text-center"
                            role="alert"
                          >
                            {error}
                          </div>
                        )}
                        <form onSubmit={handleSubmit}>
                          <small className="text-center"></small>

                          <div className="form-group">
                            <label>Old Password</label>
                            <input
                              type="password"
                              name="old_password"
                              className="form-control"
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="form-group">
                            <label>New Password</label>
                            <input
                              type="password"
                              name="new_password"
                              className="form-control"
                              onChange={handleChangeInput}
                            />
                          </div>
                          <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                              type="password"
                              name="cf_password"
                              className="form-control"
                              onChange={handleChangeInput}
                            />
                          </div>
                          {error && (
                            <div
                              className="alert alert-danger text-center"
                              role="alert"
                            >
                              {error}
                            </div>
                          )}
                          {loadPass ? (
                            <div className="form-group">
                              <button
                                className="btn btn-default"
                              >...Loading...</button>
                            </div>
                          ) : (
                            <div className="form-group">
                              <input
                                type="submit"
                                className="btn btn-default"
                                value="Submit"
                              />
                            </div>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChangePassword;
