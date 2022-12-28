/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Modal } from "reactstrap";
import { notifyError, notifySuccess } from "../../../store/notify/action";
import { patchData } from "../../../utils/api-client";
import TypeDescriptionModal from "./TypeDescriptionModal";
const TypeModal = ({ modalType, toggleType, auth, toggle }) => {
  const [userType, setUserType] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [details, setDetails] = useState({ data: "" });
  const toggleToolip = (details) => {
    setTooltipOpen(!tooltipOpen);
    setDetails(details);
  };

  const [load, setLoad] = useState(false);
  const submit = async () => {
    if (!userType) return setError("User Type can not be empty");
    setLoad(true);
    const send = { user_id: auth.user.user_id, userType };
    const data = await patchData(
      `userApi/subscription/submit`,
      send,
      auth.token
    );
    setLoad(false);
    if (data.success === false) return dispatch(notifyError(data.data));
    if (data.success) {
      toggleType();
      router.reload();
    }
    dispatch(notifySuccess("Subscribed Successfully"));
  };

  return (
    <Modal isOpen={modalType}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="form-group">
              <h1 className="text-center">Select Your Member Category</h1>
              <br></br>
              <p>
                In order for the platform to best serve you, please select the
                type of user that best aligns with you
              </p>
              {error && (
                <h2 className="p-2 text-center" style={{ color: "red" }}>
                  *{error}
                </h2>
              )}
              <div className="select-userType">
                <label className="radioUser">
                  Champion
                  <input
                    type="radio"
                    name="audience"
                    value="Champion"
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  <span className="checkround"></span>
                  <img
                    src="/help-circle.svg"
                    alt=""
                    onClick={() =>
                      toggleToolip({
                        data: "Anyone who is currently facing challenges with their physical health, emotional health and mental wellness.",
                      })
                    }
                  />
                </label>
                <br></br>

                <label className="radioUser">
                  Winner
                  <input
                    type="radio"
                    name="audience"
                    value="Winner"
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  <span className="checkround"></span>
                  <img
                    src="/help-circle.svg"
                    alt=""
                    onClick={() =>
                      toggleToolip({
                        data: "Anyone who has faced challenges in their life regarding their physical health, emotional health and mental wellness and conquered them and can provide motivation to “champions”.",
                      })
                    }
                  />
                </label>
                <br></br>

                <label className="radioUser">
                  Supporter / Buddy
                  <input
                    type="radio"
                    name="audience"
                    value="Supporter / Buddy"
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  <span className="checkround"></span>
                  <img
                    src="/help-circle.svg"
                    alt=""
                    onClick={() =>
                      toggleToolip({
                        data: " People who either have in the past or are currently supporting Champions. They may be family, friends or colleagues of the Champion.",
                      })
                    }
                  />
                </label>
                <br></br>

                <label className="radioUser">
                  Informed One
                  <input
                    type="radio"
                    name="audience"
                    value="Informed One"
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  <span className="checkround"></span>
                  <img
                    src="/help-circle.svg"
                    alt=""
                    onClick={() =>
                      toggleToolip({
                        data: "People who'd like to learn more or be better informed about issues related to physical health, emotional health and mental wellness , such as students and professionals.",
                      })
                    }
                  />
                </label>
                <br></br>

                <label className="radioUser">
                  Organization / Company
                  <input
                    type="radio"
                    name="audience"
                    value="Companies and Businesses"
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  <span className="checkround"></span>
                  <img
                    src="/help-circle.svg"
                    alt=""
                    onClick={() =>
                      toggleToolip({
                        data: "Organizations and service providers that extend services to support the Champions and Winners.",
                      })
                    }
                  />
                </label>
              </div>
            </div>

            {load ? (
              <a className="useButton pl-4 pr-4" style={{ color: "#fff" }}>
                Loading
              </a>
            ) : (
              <a
                className="useButton pl-4 pr-4"
                style={{ color: "#fff" }}
                onClick={submit}
              >
                Save
              </a>
            )}

            <p className="mt-3 text-center" style={{ color: "#808080" }}>
              <b>Please Note: This info is private and not shared publicly</b>
            </p>
          </div>
        </div>
      </div>

      <TypeDescriptionModal
        toggleToolip={toggleToolip}
        tooltipOpen={tooltipOpen}
        type={userType}
        details={details.data}
      />
    </Modal>
  );
};

export default TypeModal;
