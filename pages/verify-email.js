/* eslint-disable @next/next/no-html-link-for-pages */
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  notifyError,
  notifyLoading,
  notifySuccess,
} from "../store/notify/action";
import { postData } from "../utils/api-client";


const VerifyEmail = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState(null);
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return dispatch(notifyError("Must give an Email."));
    if (email) {
      dispatch(notifyLoading(true));
      const data = await postData(`verification/email`, {email: email});
      dispatch(notifyLoading(false));
      if (data.err) return dispatch(notifyError(data.err));
      setSuccess(true);
      if (data.success) return dispatch(notifySuccess(data.success));
    }
  };
  useEffect(() => {
    if (success) {
      window.location = "/change-password"
    }
  }, [success]);

  return (
    <section className="login-sec register-sec contact-us">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="login-inner">
              <div className="login-title mb-5">
                <h3>Trouble Logging In?</h3>
              </div>

              {/* Reset Form */}

              <form onSubmit={handleSubmit}>
                <small className="text-center"></small>
                <div className="alert alert-warning text-center" role="alert">
                  Enter your email and we will send you a code to verify your
                  email.
                </div>
                <div className="form-group mt-5">
                  <div className="form-group ">
                    <input
                      name="email"
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="submit"
                      className="btn btn-default"
                      value="Send Email Code"
                    />
                  </div>
                  <div className="form-group">
                    <div className="or">
                      <span>OR</span>
                    </div>
                    <p className="register-ac">
                      {`Don't have an account?`}
                      <a href="/register">Register</a>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;
