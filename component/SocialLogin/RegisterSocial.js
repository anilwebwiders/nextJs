/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { FacebookProvider, Login } from "react-facebook";
import { postData } from "../../utils/api-client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/dist/client/router";
import { notifyError, notifyLoading } from "../../store/notify/action";
import { useSelector } from "react-redux";
import { userLoggedIn } from "../../store/auth/actions";
import AppleLogin from "react-apple-login";

const RegisterSocial = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth.user);
  const responseAplle = async (res) => {
    console.log(res);
  };
  const responseGoogle = async (res) => {
    if (res.profileObj) {
      dispatch(notifyLoading(true));
      const data = await postData(`authApi/google/login`, {
        googleId: res.profileObj.googleId,
        email: res.profileObj.email,
        name: res.profileObj.name,
        imageUrl: res.profileObj.imageUrl,
      });
      if (data.success === false) dispatch(notifyError(data.err));

      if (data.success === true) {
        localStorage.setItem("refresh_token", data.data.refresh_token);
        localStorage.setItem("loggedIn", true);
        dispatch(userLoggedIn(data.data));
      }

      dispatch(notifyLoading(false));
    }
  };
  const faceBookLogin = async (res) => {
    if (res.profile) {
      dispatch(notifyLoading(true));
      const data = await postData(`authApi/facebook/login`, {
        id: res.profile.id,
        email: res.profile.email,
        name: res.profile.name,
        imageUrl: `https://graph.facebook.com/${res.profile.id}/picture`,
      });
      if (data.success === false) dispatch(notifyError(data.err));

      if (data.success === true) {
        localStorage.setItem("refresh_token", data.data.refresh_token);
        localStorage.setItem("loggedIn", true);
        dispatch(userLoggedIn(data.data));
      }
      dispatch(notifyLoading(false));
    }
  };

  useEffect(() => {
    if (Object.keys(auth).length !== 0 && auth.role !== "admin")
      router.push("/");
  }, [auth]);

  return (
    <>
      <ul>
        <li>
          <GoogleLogin
            clientId={process.env.GOOGLE_CIENT_ID}
            render={(renderProps) => (
              <a onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <img src="/google.png" alt=""/>
                  <span>Google</span>
              </a>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </li>
        <li>
          <FacebookProvider appId={process.env.FACEBOOK_ID}>
            <Login scope="email" onCompleted={faceBookLogin}>
              {({ handleClick, error }) => (
                <a className="facebook-icon" onClick={handleClick}>
                  <img src="/facebook.png" alt=""/>
                  <span>Facebook</span>
                </a>
              )}
            </Login>
          </FacebookProvider>
        </li>
        <li>
          <GoogleLogin
            clientId={process.env.APPLE_CIENT_ID}
            render={(renderProps) => (
              <a onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <img src="/apple.png" alt=""/>
                  <span>Apple</span>
              </a>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </li>
      </ul>
      {/* <ul>
        <li>
          <AppleLogin
            clientId={'T7Q9QM92G2.com.fnmotivation.fnmotivation'}
            redirectURI={"https://www.fnmotivation.com/register"}
            responseType={responseAplle}
            responseMode={'query'}
            usePopup={true}
            designProp={{
              height: 30,
              width: 140,
              color: "black",
              border: false,
              type: "sign-in",
              border_radius: 15,
              scale: 1,
              locale: "en_US",
            }}
          />
        </li>
      </ul> */}
    </>
  );
};

export default RegisterSocial;
