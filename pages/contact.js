import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { notifyError, notifyLoading, notifySuccess } from "../store/notify/action";
import { postData } from "../utils/api-client";

const Contact = () => {
  const dispatch = useDispatch();
  const [verified, setVerified] = useState(null);
  var verifyCallback = function (response) {
    if (response) {
      setVerified(response);
    }
  };
  const initialState = { name: "", email: "", subject: "", message: "" };
  const [data, setData] = useState(initialState);
  const { name, email, subject, message } = data;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!verified)
      return dispatch(notifyError("Please prove you are not a robot."));
    if (!name || !email || !subject || !message)
      return dispatch(notifyError("Please fill up all the fields."));
    dispatch(notifyLoading(true));
    const info = await postData("userApi/contact", data);
    dispatch(notifyLoading(false));
    if (info.err)
      return dispatch(notifyError("Please fill up all the fields."));
    if (info.success) return dispatch(notifySuccess("We got your email."));
  };

  return (
    <section className="login-sec register-sec contact-us">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="login-inner contact-inner">
              <div className="contact-us__title">
                <h3>Contact Us</h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                  <div className="form-group mt-5">
                  <label>Full Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter your Full Name"
                    className="form-control"
                    onChange={handleChangeInput}
                  />
                </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                  <div className="form-group ">
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter your Email"
                    onChange={handleChangeInput}
                  />
                </div>
                  </div>
                  <div className="col-lg-6 col-md-12">
                  <div className="form-group ">
                  <label>Subject</label>
                  <input
                    name="subject"
                    type="text"
                    placeholder="Subject"
                    className="form-control"
                    onChange={handleChangeInput}
                  />
                </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                  <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    className="form-control message"
                    id=""
                    placeholder="Enter your Message"
                    rows="3"
                    onChange={handleChangeInput}
                  />
                </div>
                  </div>
                </div>
                {/* <div className="form-group mt-5">
                  <label>Name</label>
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    onChange={handleChangeInput}
                  />
                </div> */}
                {/* <div className="form-group ">
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder=""
                    onChange={handleChangeInput}
                  />
                </div>

                <div className="form-group ">
                  <label>Subject</label>
                  <input
                    name="subject"
                    type="text"
                    className="form-control"
                    onChange={handleChangeInput}
                  />
                </div> */}

                {/* <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    className="form-control message"
                    id=""
                    rows="3"
                    onChange={handleChangeInput}
                  />
                </div> */}

                <div className="captcha mt-5">
                  <div className="d-flex justify-content-center">
                    <ReCAPTCHA
                      sitekey={process.env.RECAPTCHA_KEY}
                      onChange={verifyCallback}
                    />
                  </div>
                </div>

                <div className="form-group mt-5">
                  <input
                    type="submit"
                    className="btn-send"
                    value="Send Message"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
