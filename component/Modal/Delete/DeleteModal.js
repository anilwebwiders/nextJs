/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "reactstrap";
import { notifyError, notifySuccess } from "../../../store/notify/action";
import { deleteData } from "../../../utils/api-client";

const DeleteModal = ({
  modalDelete,
  toggleDelete,
  title,
  url,
  auth,
  type,
  redirect,
  redirectTwo,
}) => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const handleSubmit = async () => {
    setLoad(true);
    const data = await deleteData(url, auth.token);
    setLoad(false);
    if (data.err) return dispatch(notifyError(data.err));
    toggleDelete();

    if (data.success) {
      redirect();
      redirectTwo && redirectTwo();
    }

    if (data.success) return dispatch(notifySuccess("Deleted Successfully"));
  };
  return (
    <Modal isOpen={modalDelete} toggle={toggleDelete}>
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
                <span aria-hcommunity_idden="true" onClick={toggleDelete}>
                  <img src="/closs-icon.svg" alt="close" />
                </span>
              </button>

              <h3>{title}...</h3>
              <p className="mt-3 text-warning">Delete this {type}?</p>
              {load ? (
                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="btn btn-warning pl-5 pr-5"
                    data-dismiss="modal"
                    onClick={handleSubmit}
                  >
                    Loading
                  </button>
                </div>
              ) : (
                <div className="text-center mt-4">
                  <button
                    type="button"
                    className="btn btn-danger pl-5 pr-5"
                    data-dismiss="modal"
                    onClick={handleSubmit}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="btn btn-success pl-5 pr-5 ml-3"
                    onClick={toggleDelete}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
