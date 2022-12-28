import React from "react";
import { Modal } from "reactstrap";

const TypeDescriptionModal = ({tooltipOpen, toggleToolip, type, details}) => {
  return (
    <Modal isOpen={tooltipOpen} toggle={toggleToolip}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="form-group">
              <h1 className="text-center">{type}</h1>
              <br></br>

              <p className="mt-3 text-center" style={{ color: "#808080" }}>
                <b>{details}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TypeDescriptionModal;
