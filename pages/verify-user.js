import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { notifyError, notifyLoading } from "../store/notify/action";
import { postData } from "../utils/api-client";
import Cookie from "js-cookie";
import { userLoggedIn } from "../store/auth/actions";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const VerifyUser = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth.user);
  const [code, setCode] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code) return dispatch(notifyError("Token can not be empty"));
    if (code) {
      dispatch(notifyLoading(true));
      const res = await postData(`verification/user`, { code: code });

      if (res.success === false) dispatch(notifyError(res.message));

      if (res.success === true) localStorage.setItem("refresh_token", res.data.refresh_token);
      if (res.success === true) localStorage.setItem("loggedIn", true);
      if (res.success === true) dispatch(userLoggedIn(res.data));

      dispatch(notifyLoading(false));
    }
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0 && auth.role !== "admin")
      router.push("/");
  }, [auth]);

  return (
    <>
      <div className="alert alert-danger text-center" role="alert">
        Please go to your email inbox to retrieve your code and enter it in the
        box below to complete registration process.
      </div>
      <section className="login-sec register-sec contact-us">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="login-inner">
                <div className="login-title mb-5">
                  <h3>Enter your Secret Token below</h3>
                </div>

                {/* Reset Form */}

                <form onSubmit={handleSubmit}>
                  <small className="text-center"></small>
                  {/* <div className="alert alert-warning text-center" role="alert">
                  We have sent you a verification email.
                </div> */}
                  <div className="form-group mt-5">
                    <div className="form-group ">
                      <input
                        name="code"
                        type="text"
                        className="form-control"
                        placeholder=""
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="submit"
                        className="btn btn-default"
                        value="Enter your Secret Token below"
                      />
                    </div>
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

export default VerifyUser;
