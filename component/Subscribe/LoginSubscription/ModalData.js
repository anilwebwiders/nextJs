/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import communityData from "../../../store/consts/community";
import Selected from "./Selected";
import { getFetchData, patchData, postData } from "../../../utils/api-client";
import PreloaderLg from "../../Preloader/PreloaderLg";
import { useDispatch } from "react-redux";
import { notifyError, notifySuccess } from "../../../store/notify/action";
import TypeModal from "./TypeModal";
import { useRouter } from "next/router";
const ModalData = ({ toggle, auth, toggleType }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  const [community, setAllCommunity] = useState([]);
  const finalSelectedCommunity =
    community.length === 0 ? communityData : community;

  //Get Subs
  const getSubscription = useCallback(async () => {
    const data = await getFetchData(
      `userApi/subscription?user_id=${auth.user.user_id}`,
      auth.token
    );
    const dataCom = data.data.map((i) => {
      const filterID = communityData.find(
        (item) => item.community_id === i.community_id
      );
      filterID.isAdded = true;
      return filterID;
    });

    const notMathced = communityData.filter((item) => {
      return community.find((i) => item.community_id !== i.community_id);
    });

    setAllCommunity(notMathced);
    setLoading(false);
  }, [auth]);

  useEffect(() => {
    getSubscription();
  }, [getSubscription]);

  //Submit
  const [loadSub, setLoadSub] = useState(false);
  const handleSubscribe = async () => {
    setLoadSub(true);
    const filter = await finalSelectedCommunity.filter(
      (i) => i.isAdded == true
    );
    const data = await postData(
      `userApi/subscription`,
      { data: filter, user_id: auth.user.user_id },
      auth.token
    );

    if (data.success == false) {
      dispatch(notifyError(data.message));
      setLoadSub(false);
    } else {
      setLoadSub(false);
      if (auth.user.role === "user") {
        toggleType();
      } else {
        router.reload();
        toggle();
      }
      toggle();
    }
  };

  //Testing
  const hanldeCommunity = async (com, id) => {
    // const send = { community_id: id, user_id: auth.user.user_id };
    // const data = await postData(`userApi/subscription`, send, auth.token);
    // if(data.success === false) return  dispatch(notifyError(data.data));
    // if (data.success) {
    // getSubscription();
    if (com.isAdded === true) {
      const filtered = finalSelectedCommunity.filter(
        (i) => com.community_id !== i.community_id
      );
      com.isAdded = false;
      filtered.push(com);
      setAllCommunity(filtered);
    } else {
      const filtered = finalSelectedCommunity.filter(
        (i) => com.community_id !== i.community_id
      );
      filtered.push({ ...com, isAdded: true });
      setAllCommunity(filtered);
    }
    // }
  };

  const selected = finalSelectedCommunity.find((i) => i.isAdded === true);

  return (
    <div>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              {auth.user.role !== "user" && (
                <span aria-hidden="true" onClick={toggle}>
                  <img src="/closs-icon.svg" alt="Close" />
                </span>
              )}
            </button>
            {loading ? (
              <PreloaderLg />
            ) : (
              <>
                {selected ? (
                  <h3>Subscribed Community Categories</h3>
                ) : (
                  <h3>Select Categories to Subscribe</h3>
                )}
                <p>Choose the topics that you are most interested in</p>

                <div className="row">
                  {finalSelectedCommunity.map((info) => (
                    <div
                      key={info.community_id}
                      className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6"
                    >
                      <div
                        style={{ cursor: "pointer" }}
                        className="related-articles-box"
                      >
                        <div
                          className="image-holder"
                          onClick={() =>
                            hanldeCommunity(info, info.community_id)
                          }
                        >
                          <a>
                            <img
                              src={`/com/${info.community_id}.png`}
                              alt="community"
                            />
                          </a>
                          <span className={info.isAdded === true && "active"}>
                            <img
                              src="/check-icon.svg"
                              alt="tick"
                              className="img-fluid"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {loadSub ? (
                  <button className="subscribe-btn pl-5 pr-5">
                    ...Loading...
                  </button>
                ) : (
                  <button
                    className="subscribe-btn pl-5 pr-5"
                    onClick={handleSubscribe}
                  >
                    SUBSCRIBE
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalData;
