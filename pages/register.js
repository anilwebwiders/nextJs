/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeadData from "../component/HeadData";
import {
  notifyError,
  notifyLoading,
  notifySuccess,
} from "../store/notify/action";
import { validRegister } from "../utils/valid";
import ReCAPTCHA from "react-google-recaptcha";
import { postData } from "../utils/api-client";
import { useRouter } from "next/dist/client/router";
import RegisterSocial from "../component/SocialLogin/RegisterSocial";

const Register = () => {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (auth.user.user_id) router.push("/");
  }, [auth]);

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
  const [checked, setChecked] = useState(false);
  const [captchaRes, setcaptchaRes] = useState(null);
  const capctha = (res) => {
    setcaptchaRes(res);
  };
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

    const errMsg = validRegister(
      fullname,
      username,
      email,
      password,
      cf_password,
      gender,
      dob,
      checked,
      captchaRes
    );
    if (errMsg) return dispatch(notifyError(errMsg));
    dispatch(notifyLoading(true));
    const data = await postData(`authApi/register`, userData);
    dispatch(notifyLoading(false));
    if (data.success === false) return dispatch(notifyError(data.message));
    setSuccess(true);
    if (data.success) return dispatch(notifySuccess(data.message));
  };
  useEffect(() => {
    if (success) {
      window.location = "/verify-user";
    }
  }, [success]);

  return (
    <div>
      <HeadData />
      <section className="login-sec register-sec">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="login-inner sign_inner">
                <div className="login-title">
                  <h3>Sign Up</h3>
                 
                </div>
                <form onSubmit={handleSubmit}>
                 <div class="row">
                  <div class="col-lg-6 col-md-12">
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Username"
                      name="username"
                      onChange={handleChangeInput}
                    />
                    
                  </div>
                  <div className="form-group ">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your Email"
                      name="email"
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="form-group ">
                    <label> Create Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder=""
                      name="password"
                      onChange={handleChangeInput}
                    />
                    {/* <p className="password-must">
                      Your password must contain at least 6 characters.
                    </p> */}
                  </div>
                  </div>
                  <div class="col-lg-6 col-md-12">
                  <div className="form-group ">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your Full Name"
                      name="fullname"
                      onChange={handleChangeInput}
                    />
                  </div>
                 
                  <div class="row">
                  <div class="col-md-6">
                  <div className="form-group ">
                    <label>Gender</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Male"
                      name="fullname"
                      onChange={handleChangeInput}
                    />
                  </div>
                  </div>
                  <div class="col-md-6">
                  <div className="form-group ">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="mm/dd/yyyy"
                      name="dob"
                      value={dob}
                      onChange={handleChangeInput}
                    />
                  </div>
                  </div>
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
                  </div>
                 </div>
                  
                
                  <div className="form-group text_terms mb-5">
                  <input
                        type="checkbox"
                        name="check"
                        onChange={() => setChecked(!checked)}
                      />
                    <label className="check">
                      I have read and agree to the
                      <a target="_blank" href="/terms-and-conditions">
                        {" "}
                        Terms{" "}
                      </a>
                      and
                      <a target="_blank" href="/privacy-policy">
                        {" "}
                        Privacy Policy
                      </a>
                     
                      {/* <span className="checkmark"></span> */}
                    </label>
                  </div>
                  <div className="form-group d-flex justify-content-center">
                    <ReCAPTCHA
                      sitekey={process.env.RECAPTCHA_KEY}
                      onChange={capctha}
                    />
                  </div>
                  <div className="form-group sub-btn">
                    <input
                      type="submit"
                      className="btn btn-default"
                      value="Register"
                    />
                  </div>
                  <div className="form-group">
                  <div class="under-line-or"><h5>Please Sign up with one of Your Existing third party Accounts</h5></div>
                    <div className="social-media">
                    <div className="social-btn">
                      <RegisterSocial />
                    </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <p className="register-ac">
                      Already have an account?
                      <a href="/login">Login Now</a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
