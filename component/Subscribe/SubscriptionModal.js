/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { Modal } from "reactstrap";
import communityData from "../../store/consts/community";
const SubscriptionModal = ({ modal, toggle }) => {
  return (
    <Modal isOpen={modal} toggle={toggle}>
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
              <h3>Select Categories to Subscribe</h3>
              <p>Choose the topics that you are most interested in</p>

              <div className="row">
                {communityData.map((info) => (
                  <div
                    key={info.community_id}
                    className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6"
                  >
                    <div
                      style={{ cursor: "pointer" }}
                      className="related-articles-box"
                    >
                      <div className="image-holder">
                        <a href="/login">
                          <img
                            src={`/com/${info.community_id}.png`}
                            alt="community"
                          />
                        </a>
                        <span>
                          <img
                            src="/check-icon.svg"
                            alt="tick"
                            className="img-flucommunity_id"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button href="/login" className="subscribe-btn pl-5 pl-5 pr-5">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SubscriptionModal;
