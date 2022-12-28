import React, { useState } from "react";
import { useSelector } from "react-redux";
import LoginSubscriptionModal from "./LoginSubscription/LoginSubscriptionModal";
import SubscriptionModal from "./SubscriptionModal";

const Subscribe = () => {
  const auth = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <section className="stay-connected-sec">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="stay-connected-inner">
              {auth.user.username ? (
                <>
                  <h2 className="sub-menu">Subscribed Community Categories</h2>
                  <h1 className="text-white">
                    Click below to view or edit the community categories that you are currently subscribed to
                  </h1>
                </>
              ) : (
                <h2>
                  Stay connected <br></br>
                  Have stories sent to your inbox
                </h2>
              )}
              <a  onClick={toggle} className="mt-3">
                {auth.user.username ? "Edit Categories" : "Subscribe"}
              </a>
            </div>
          </div>
          <div className="col-12">
          <img src="/stay-connected-img.png" alt="" />
          </div>
        </div>
      </div>
      {auth.user.username ? (
        <LoginSubscriptionModal modal={modal} toggle={toggle} auth={auth} />
      ) : (
        <SubscriptionModal modal={modal} toggle={toggle} />
      )}
    </section>
  );
};

export default Subscribe;
