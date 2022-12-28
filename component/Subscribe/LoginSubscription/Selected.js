/* eslint-disable @next/next/no-img-element */
import React from "react";
import { postData } from "../../../utils/api-client";

const Selected = ({ selectedCommunity, getSubscription, auth }) => {
  const handleSelect = async (id) => {
    const send = { community_id: id, user_id: auth.user.user_id };
    const data = await postData(`userApi/subscription`, send, auth.token);
    if (data.success) return getSubscription();
  };
  return (
    <>
       {selectedCommunity.length !== 0 && <h3>You are subscribed to the following categories:</h3>}

      <div className="row">
        {selectedCommunity.map((info) => (
          <div
            key={info.community_id}
            className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6"
          >
            <div style={{ cursor: "pointer" }} className="related-articles-box">
              <div className="image-holder">
                <a onClick={() => handleSelect(info.community_id)}>
                  <img src={`/com/${info.community_id}.png`} alt="community" />
                </a>
                <span className='active'>
                  <img src="/check-icon.svg" alt="tick" className="img-fluid" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Selected;
