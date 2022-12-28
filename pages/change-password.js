import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ResetPasswordForm from "../component/resetPassword/ResetPassword";
import {
  notifyError,
  notifyLoading,
  notifySuccess,
} from "../store/notify/action";
import { postData } from "../utils/api-client";

const ResetPassword = () => {
  const [email, setEmail] = useState(null);
  const dispatch = useDispatch();
  const [code, setCode] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code) return dispatch(notifyError("Token can not be empty"));
    if (code) {
      dispatch(notifyLoading(true));
      const data = await postData(`verification/user/password`, { code: code });
      dispatch(notifyLoading(false));
      if (data.err) return dispatch(notifyError(data.err));
      if (data.email) return setEmail(data.email);
    }
  };
  const reLoad = () => {
      window.location = "/verify-email";
    
  };

  return (
    <section className="login-sec register-sec contact-us chnage-pass">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="login-inner change_passward">
              <div className="login-title mb-5">
                <h3>{!email ? "Change Password" : "Change Password"}</h3>
                
              </div>

              {/* Reset Form */}

              {!email ? (
                <form onSubmit={handleSubmit} autoComplete="off">
                  {/* <div className="alert alert-warning text-center" role="alert">
                    An email was sent to you containing your secret validation
                    code. If you did not receive this email, please click this
                    link{" "}
                    <span
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={reLoad}
                    >
                      here
                    </span>
                  </div> */}
                  <div className="form-group mt-5">
                    {/* <div className="form-group ">
                      <input
                        name="code"
                        type="text"
                        className="form-control"
                        placeholder=""
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </div> */}
                   <div class="form-group mb-4">
                    <label>Current Password</label>
                   <input type="password" name="password" class="form-control" placeholder="**********" />
                   </div>
                   <div class="form-group mb-4">
                    <label>New Password</label>
                   <input type="password" name="password" class="form-control" placeholder="**********" />
                   </div>
                   <div class="form-group mb-4">
                    <label>Confirm New Password</label>
                   <input type="password" name="password" class="form-control" placeholder="**********" />
                   </div>
                    <div className="form-group">
                      <input
                        type="submit"
                        className="btn btn-send"
                        value="Change Password"
                      />
                    </div>
                  </div>
                </form>
              ) : (
                <ResetPasswordForm email={email} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
