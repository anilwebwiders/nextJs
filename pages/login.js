/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "../store/auth/actions";
import { notifyError, notifyLoading } from "../store/notify/action";
import { postData } from "../utils/api-client";
import LoginSocial from "../component/SocialLogin/LoginSocial";
import HeadData from "../component/HeadData";
import Cookie from "js-cookie";

const Login = () => {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const router = useRouter();
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const auth = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(notifyLoading(true));
    const res = await postData("authApi/login", userData);
    if (res.success === false) dispatch(notifyError(res.message));

    if (res.success === true) {
      localStorage.setItem("refresh_token", res.data.refresh_token);
      localStorage.setItem("loggedIn", true);
      Cookie.set("user_id", JSON.stringify(res.data.user.user_id));
      dispatch(userLoggedIn(res.data));
    }

    dispatch(notifyLoading(false));
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0 && auth.role !== "admin")
      router.push("/");
    if (Object.keys(auth).length !== 0 && auth.role === "admin")
      router.push("/admin");
  }, [auth]);

  return (
    <>
      <HeadData />
      <section className="login-sec login_div">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="login-inner">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-4">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={handleChangeInput}
                    />
                    {/* <a href="JavaScript:void(0);" class="icon-view">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                        </a> */}
                    {/* <span className="arror-sms">
                      Wrong password. Please enter a correct password
                    </span> */}
                  </div>
                  <div className="remember-me">
                  <div className="form-group">
                  <input type="checkbox" />
                    <label className="check ">
                      Remember Me
                      
                      {/* <span className="checkmark"></span> */}
                    </label>
                  </div>
                  <a href="/verify-email">
                      <p>Forget Password ?</p>
                    </a>
                  </div>

                  <div className="form-group sub-btn">
                    <input
                      type="submit"
                      className="btn btn-default"
                      value="Login"
                    />
                  </div>
                  <div class="under-line-or">
                     <h5>or</h5>
                  </div>
                  <div className="form-group">
                    <div className="social-btn">
                      <LoginSocial />
                    </div>
                    <p className="register-ac">
                      {`Don't have an account?`}
                      <a href="/register">Register Now</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
