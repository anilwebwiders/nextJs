/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "reactstrap";
import {
  notifyError,
  notifySuccess,
} from "../../../../../store/notify/action";
import { patchData } from "../../../../../utils/api-client";
const ArticleCommentReplyEdit = ({ toggle, modal, editData, getR_Comments }) => {

  const dispatch = useDispatch();
  const [comment, setComment] = useState({ commentTxt: "" });

  const { commentTxt } = comment;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };
  const auth = useSelector((state) => state.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postInfo = {
      ac_reply_id: editData.ac_reply_id,
      message: comment.commentTxt ? comment.commentTxt : editData.ac_reply_text,
    };
    const data = await patchData("articleApi/comment/edit/reply", postInfo, auth.token);
    if (data.error) dispatch(notifyError(data.error));
    getR_Comments();
    toggle();
    if (data.success) dispatch(notifySuccess("Updated Successfully"));
  };
  return (
    <Modal isOpen={modal} toggle={toggle} className="comment_edit_model">
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
                        {/* {error && (
                              <div
                                className="alert alert-danger text-center"
                                role="alert"
                              >
                                {error}
                              </div>
                            )} */}
                        <div className="article-comments-write mt-5">
                          <h3>Edit Comment</h3>
                          <form onSubmit={handleSubmit}>
                            <textarea
                              className="form-control"
                              name="commentTxt"
                              placeholder="Write here...."
                              defaultValue={editData.ac_reply_text}
                              onChange={handleChangeInput}
                            />

                            <div className="comment-post">
                              <div>
                              <button
                                className="btn btn-warning text-white mt-3 pl-5 pr-5 pt-3 pb-3"
                                type="submit"
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-warning text-white mt-3 pl-5 pr-5 pt-3 pb-3"
                                onClick={toggle}
                              >
                                Cancel
                              </button>
                              </div>

                              <span>{commentTxt.length}/500</span>
                            </div>
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
      </div>
    </Modal>
  );
};

export default ArticleCommentReplyEdit;
