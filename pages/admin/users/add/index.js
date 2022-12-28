
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PreloaderLg from "../../../../component/Preloader/PreloaderLg";
import {
  notifyError,
  notifyLoading,
  notifySuccess,
} from "../../../../store/notify/action";
import { postData } from "../../../../utils/api-client";
import validUserAdmin from '../../../../utils/validUserAdmin'
import  NotFound from '../../../404'
const AddUser = () => {
  const auth = useSelector(state => state.auth);
    const router = useRouter()
  const initialState = {
    email: "",
    password: "",
    username: "",
    fullname: "",
    gender: "",
    dob: "",
    cf_password: "",
  };
  const [userData, setUserData] = useState(initialState);

  const { fullname, username, email, password, cf_password, gender, dob } =
    userData;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = validUserAdmin(
      fullname,
      username,
      email,
      password,
      cf_password,
      gender,
      dob
    );
    if (errMsg) return dispatch(notifyError(errMsg));
    dispatch(notifyLoading(true));
    const data = await postData(`adminApi/users/add`, userData);
    dispatch(notifyLoading(false));
    if (data.err) return dispatch(notifyError(data.err));
    setSuccess(true);
    if (data.user) return dispatch(notifySuccess(data.user));
  };
  useEffect(() => {
    if (success) router.push("/admin/users");
  }, [success]);

  if (auth.loading) return <PreloaderLg />;
  if (auth.user.role === "admin") {
    return (
      <section className="login-sec register-sec">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="login-inner">
                <div className="login-title">
                  <h3>Add User</h3>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      name="username"
                      onChange={handleChangeInput}
                    />
                    <p className="user-text">
                      Username may contain only letters, numbers, and @/./+/-/_
                      characters. Username cannot contain spaces.
                    </p>
                  </div>
                  <div className="form-group ">
                    <label>Fullname</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      name="fullname"
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="form-group ">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder=""
                      name="email"
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="form-group ">
                    <label>Gender</label>
                    <div className="select-gender">
                      <ul>
                        <li>
                          <label className="radio">
                            Male
                            <input
                              type="radio"
                              name="gender"
                              defaultValue="male"
                              onChange={handleChangeInput}
                            />
                            <span className="checkround"></span>
                          </label>
                        </li>
                        <li>
                          <label className="radio">
                            Female
                            <input
                              type="radio"
                              name="gender"
                              defaultValue="demale"
                              onChange={handleChangeInput}
                            />
                            <span className="checkround"></span>
                          </label>
                        </li>
                        <li>
                          <label className="radio">
                            Non-Binary
                            <input
                              type="radio"
                              name="gender"
                              defaultValue="others"
                              onChange={handleChangeInput}
                            />
                            <span className="checkround"></span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="form-group ">
                    <label>Date of Birth</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="mm-dd-yyyy"
                      name="dob"
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="form-group ">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder=""
                      name="password"
                      onChange={handleChangeInput}
                    />
                    <p className="password-must">
                      Your password must contain at least 6 characters.
                    </p>
                  </div>
                  <div className="form-group ">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder=""
                      name="cf_password"
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      className="btn btn-default"
                      value="Add"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return <NotFound />;
  }
};

export default AddUser;
