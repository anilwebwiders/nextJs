import React, { useCallback, useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Notify from "./Noyify";
import Footer from "./Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import AdminNav from "./Navbar/AdminNav";
import Loading from "./Loading";
import { loadingUser, userLoggedIn } from "../store/auth/actions";
import { getAll, getFetchData } from "../utils/api-client";
import PopupLogin from "./Modal/PopupLogin/PopupLogin";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { notifyError } from "../store/notify/action";
import { browserName, CustomView } from "react-device-detect";

function Layout({ children }) {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const router = useRouter();
  const ISSERVER = typeof window === "undefined";

  const loggedLocal =
    !ISSERVER && JSON.parse(localStorage.getItem("loggedIn"));

  const loggedToken = !ISSERVER && localStorage.getItem("refresh_token");

  const loginUser = useCallback(async () => {
    if (loggedLocal || loggedToken) {
      setLoad(true);
      dispatch(loadingUser(true));

      const getUser = async () => {
        const token = localStorage.getItem("refresh_token");

        const res = await getFetchData("authApi/accessToken", token);
        if (res.success === false) {
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("loggedIn");
          dispatch(notifyError(res.message));
          dispatch(loadingUser(false));
          setLoad(false);
        } else {
          dispatch(userLoggedIn(res.data));
          dispatch(loadingUser(false));
          setLoad(false);
        }
      };
      getUser();
    }
  }, [loggedLocal, loggedToken]);

  useEffect(() => {
    loginUser();
  }, [loginUser]);

 

  const auth = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const sampleFunction = () => {
    setTimeout(() => {
      toggle();
    }, 15000);
  };

  useEffect(() => {
    switch (router.pathname && !loggedLocal) {
      case "/login" === router.pathname && !loggedLocal:
      case "/register" === router.pathname && !loggedLocal:
        break;
      case "/verify-email" === router.pathname && !loggedLocal:
        break;
      case "/verify-user" === router.pathname && !loggedLocal:
        break;
      case "/change-password" === router.pathname && !loggedLocal:
        break;
      case "/contact" === router.pathname && !loggedLocal:
        break;
      case "/about" === router.pathname && !loggedLocal:
        break;
      case "/privacy-policy" === router.pathname && !loggedLocal:
        break;
      case "/terms-and-conditions" === router.pathname && !loggedLocal:
        break;
      default:
        sampleFunction();

      // code block
    }
  }, [router.pathname]);

  console.log(browserName);

  if (load) return <Loading />;
  return (
    <div>
      {!loggedLocal && <PopupLogin modal={modal} />}
      <Notify />
      {auth.user?.role === "admin" ? <AdminNav /> : <Navbar />}
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
