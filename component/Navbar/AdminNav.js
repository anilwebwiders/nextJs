/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "../../store/auth/actions";
import { notifyError } from "../../store/notify/action";
import { getAll } from "../../utils/api-client";
import { browserName, CustomView } from "react-device-detect";
import Preloader from "../Preloader/Preloader";
import {
  FaUserFriends,
  FaBell,
  FaTextWidth,
  FaHighlighter,
  FaSignInAlt,
} from "react-icons/fa";
import Cookie from "js-cookie";

import MobileAdminNav from "./MobileAdminNav";
const AdminNav = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const [load, setLoad] = useState(false);


  const isActive = (r) => {
    if (r === router.pathname) {
      return " active";
    } else {
      return "";
    }
  };
  const logOut = () => {
    Cookie.remove("user_id");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("loggedIn");
    window.location = "/login";
  };

  const [navOpen, setNavOpen] = useState(false);
  const openNav = () => setNavOpen(!navOpen);

  return (
    <>
      {navOpen && <MobileAdminNav openNav={openNav} />}
      <header className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="navigation">
                <nav className="navbar navbar-expand-lg navbar-lightt">
                  <a className="navbar-brand">
                    <img src="/logo.png" alt="" className="img-fluid" />
                  </a>
                  <div className="mobile-btn">
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                      onClick={openNav}
                    >
                      <span className="navbar-toggler-icon"></span>
                      <span className="navbar-toggler-icon"></span>
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="header-right">
                      {load ? (
                        <Preloader />
                      ) : (
                        <>
                          {auth.user.username ? (
                            <ul>
                              <li>
                                <div className="use-profile">
                                  <div className="text-box">
                                    <a>
                                      <h3>{auth.user.username}</h3>
                                    </a>
                                  </div>
                                  <div className="image-holder">
                                    <img
                                      className="img-fluid"
                                      src={auth.user.avatar}
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </li>
                            </ul>
                          ) : (
                            <ul className="acount-btn">
                              <li>
                                <div className="use-profile">
                                  <div className="text-box">
                                    <a href="/login">
                                      <h3>Login</h3>
                                    </a>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <Link href="/admin/users">
                          <a className={"nav-link" + isActive("/admin/users")}>
                            <FaUserFriends color="#ffc107" /> Users
                          </a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/admin/stories">
                          <a
                            className={"nav-link" + isActive("/admin/stories")}
                          >
                            <FaTextWidth color="#ffc107" /> Stories
                          </a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/admin/articles">
                          <a
                            className={"nav-link" + isActive("/admin/articles")}
                          >
                            <FaHighlighter color="#ffc107" /> Articles
                          </a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link href="/admin/reports">
                          <a
                            className={"nav-link" + isActive("/admin/reports")}
                          >
                            <FaBell color="#ffc107" /> Reports
                          </a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" onClick={logOut}>
                          <FaSignInAlt color="#ffc107" /> LogOut
                        </a>
                      </li>
                    </ul>
                    <div className="header-right">
                      {load ? (
                        <Preloader />
                      ) : (
                        <>
                          {auth.user.username ? (
                            <ul>
                              <li>
                                <div className="use-profile">
                                  <div className="text-box">
                                    <h3>
                                      <a>{auth.user.username}</a>
                                    </h3>
                                  </div>
                                  <div className="image-holder">
                                    <img
                                      className="img-fluid"
                                      src={auth.user.avatar}
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </li>
                            </ul>
                          ) : (
                            <ul className="acount-btn">
                              <li>
                                <a href="/login">Login</a>
                              </li>
                              <li className="login-btn">
                                <a href="/register">
                                  <a>Sign Up</a>
                                </a>
                              </li>
                            </ul>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default AdminNav;
