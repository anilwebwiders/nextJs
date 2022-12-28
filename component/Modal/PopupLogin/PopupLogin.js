/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element 
 <div className="or"><span>OR</span></div>*/

import React from "react";
import { Modal } from "reactstrap";
const PopupLogin = ({ modal }) => {

  return (
    <Modal isOpen={modal} id="moadal_login" className="modal-dialog-centered">
        <div className="login_register-modal">
                <div className="modal-content">
                    <div className="modal-body">
                    <div className="modal-header border-0">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><img src="images/closs-icon.svg" alt="" /></span>
                        </button>
                        </div>
                        <img src="/on-lode-popup.png" className="login_model_img" />
                        <h3 className="mb-md-5 mb-4 mt-md-4">Please register or login to interact on the FNMotivation Community Platform</h3>
                        <div className="d-flex align-items-center justify-content-center">
                            <a className="subscribe-btn mr-3" href="/login">Login</a>
                            
                            <a className="subscribe-btn outline" href="/register">Register</a>
                        </div>
                    </div>
                </div>
            </div>
    </Modal>
  );
};

export default PopupLogin;
