/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postData } from "../../../../utils/api-client";
import { notifySuccess } from "../../../../store/notify/action";


const ReportArticleForm = ({ title, article_id, toggle, user_id, auth }) => {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [load, setLoad] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg(null)
    setLoad(true)
    if (!msg) return setErrMsg("Reason can't be empty");
    const data = await postData(
      "adminApi/reports/article",
      { article_id, user_id, msg },
      auth.token
    );
    setLoad(false);
    if (data.err) return setErrMsg(data.err)
    toggle()
    if (data.success) return dispatch(notifySuccess("Reported Successfully"));
  };
  return (
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
              <span aria-hidden="true" onClick={toggle}>
                <img src="/closs-icon.svg" alt="close" />
              </span>
            </button>
       
            <h4 className="text-center">You are reporting for:</h4>
            <p>{title}</p>
            {errMsg && (
              <div className="alert alert-danger text-center" role="alert">
                {errMsg}
              </div>
            )}
            <div className="login-inner form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Reason</label>
                  <textarea
                    type="text"
                    rows="5"
                    name="report_msg"
                    className="form-control"
                    onChange={(e) => setMsg(e.target.value)}
                  />
                </div>

                {load ? (
                    <p  className="btn btn-default">...Loading...</p>
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
  );
};

export default ReportArticleForm;
