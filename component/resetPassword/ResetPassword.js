import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  notifySuccess,
  notifyError,
  notifyLoading,
} from "../../store/notify/action";
import { patchData } from "../../utils/api-client";
import { validPass } from "../../utils/valid";

const ResetPasswordForm = ({email}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);
  const [userData, setUserData] = useState([]);
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const { password, cf_password } = userData;
  const handleSubmitPass = async (e) => {
    e.preventDefault();
    
    const check = validPass(userData.password, userData.cf_password)
    if (check) return setError(check);

    dispatch(notifyLoading(true));
    const data = await patchData(`userApi/password/change`, {
      password: userData.password,
      email: email,
    });
    dispatch(notifyLoading(false));
    if (data.err) return dispatch(notifyError(data.err));
    if (data.success) dispatch(notifySuccess("Password has been changed"));
    if (data.success) return setReload(true);
  };

  useEffect(() => {
    if (reload) router.push("/login");
  }, [reload]);

  return (
    <form onSubmit={handleSubmitPass} autoComplete="off">
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}
      <div className="form-group mt-5">
        <div className="form-group ">
          <input
            placeholder="Enter New Password"
            name="password"
            type="password"
            className="form-control"
            onChange={handleChangeInput}
            value={password}
          />
        </div>
        <div className="form-group ">
          <input
            placeholder="Confirm New Password"
            name="cf_password"
            type="password"
            className="form-control"
            onChange={handleChangeInput}
            value={cf_password}
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            className="btn btn-default"
            value="Change Password"
          />
        </div>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
