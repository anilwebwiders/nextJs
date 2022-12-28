/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Preloader from "../Preloader/Preloader";
import MobileNav from "./MobileNav";
import { getFetchData } from "../../utils/api-client";
import NotiUi from "./NotiUi";
import { useSWRInfinite } from "swr";
import axios from "axios";




const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();

  const isActive = (r) => {
    if (r === router.pathname) {
      return " active";
    } else {
      return "";
    }
  };

  const [newNoti, setNewNoti] = useState(true);
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
    notifications.length !== 0 &&
      localStorage.setItem(
        "_timeStmp_",
        JSON.stringify(notifications[0].created_at)
      );
  };

  /* Open when someone clicks on the span element */
  const [navOpen, setNavOpen] = useState(false);
  const openNav = () => setNavOpen(!navOpen);

  const [notifications, setNotifications] = useState([]);
  const [loader, setLoader] = useState(false);

  const [page, setPage] = useState(0);

  useEffect(() => {
    const time = JSON.parse(localStorage.getItem("_timeStmp_"));
    notifications?.length > 0
      ? setNewNoti(time === notifications[0].created_at)
      : setNewNoti(notifications?.length < 0 ? false : true);
  }, [notifications]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    notifications?.length !== 0 &&
      localStorage.setItem(
        "_timeStmp_",
        JSON.stringify(notifications[0].created_at)
      );
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetcher = (url, token) =>
    axios
      .get(url, { headers: { Authorization: token } })
      .then((res) => res.data);

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return auth.user.user_id
      ? [
          `/api/userApi/notification?user_id=${auth.user.user_id}&show=${pageIndex}`,
          auth.token,
        ]
      : null; // SWR key
  };

  const { data, size, setSize } = useSWRInfinite(getKey, fetcher, {
    refreshInterval: 1000,
  });

  const fetchData = () => {
    setPage(page + 10);
    setSize(size + 1);
  };

  const notiData = data?.length > 0 && data.flat();

  useEffect(() => {
    setNotifications(notiData);
    !data && setLoader(true);
    data && setLoader(false);
  }, [data]);
  



  return (
    <>
      {navOpen && <MobileNav openNav={openNav} />}
      <header className="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="navigation">
                <nav className="navbar navbar-expand-lg navbar-lightt">
                  <Link href="/">
                    <a className="navbar-brand">
                      <img src="/logo.png" alt="" className="img-fluid" />
                    </a>
                  </Link>
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
                      <Link href="/search">
                        <a>
                          <img src="/search-icon.svg" alt="" className="mr-2" />
                        </a>
                      </Link>

                      {auth.user.username ? (
                        <ul>
                          <li
                            className="notification-icon"
                            onClick={handleClick}
                          >
                            {!newNoti ? (
                              <a>
                                <img src="/notification-icon.svg" alt="" />
                              </a>
                            ) : (
                              <img src="/notification-icon.svg" alt="" />
                            )}
                          </li>
                          {anchorEl && (
                            <NotiUi
                              notifications={notifications}
                              loader={loader}
                              fetchData={fetchData}
                              setShow={setShow}
                              setNewNoti={setNewNoti}
                              anchorEl={anchorEl}
                              handleClose={handleClose}
                              size={size}
                              setSize={setSize}
                            />
                          )}
                          <li>
                            <div className="use-profile">
                              <div className="text-box">
                                <Link
                                  href={{
                                    pathname: `/user/[id]/[username]`,
                                    query: {
                                      id: auth.user.user_id,
                                      username: auth.user.username,
                                    },
                                  }}
                                >
                                  <a>
                                    <h3>{auth.user.username}</h3>
                                  </a>
                                </Link>
                              </div>
                              <div className={`image-holder`}>
                                <Link
                                  href={{
                                    pathname: `/user/[id]/[username]`,
                                    query: {
                                      id: auth.user.user_id,
                                      username: auth.user.username,
                                    },
                                  }}
                                >
                                  <a className="image-Short">
                                    <img
                                      className="img-fluid"
                                      src={auth.user.avatar}
                                      alt=""
                                    />
                                  </a>
                                </Link>
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
                    </div>
                  </div>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav">
                      <li className="nav-item m-0">
                        <Link href="/">
                          <a className={"nav-link p-0" + isActive("/")}>Home</a>
                        </Link>
                      </li>
                    
                      <li className="nav-item dropdown">
                        <Link href="/communities">
                          <a className={"nav-link" + isActive("/communities")}>
                          Communities
                          <span class="sub-menu-toggle"></span>
                          </a>
                          
                        </Link>
                        <ul className="menu-bar">
                          <li>
                            <Link href="/communities">
                            <a className={"nav-link" + isActive("/communities")}>
                              <div class="color-box-icon">
                                <span>Drug<br></br>Addiction</span>
                                <img src="/color-box-image-1.png" alt=""/>
                              </div>
                            </a>
                          </Link>
                          </li>
                          <li>
                            <Link href="/communities">
                            <a className={"nav-link" + isActive("/communities")}>
                              <div class="color-box-icon">
                                <span>Alcohol<br></br>Addiction</span>
                                <img src="/color-box-image-2.png" alt=""/>
                              </div>
                            </a>
                          </Link>
                          </li>
                          <li>
                            <Link href="/communities">
                            <a className={"nav-link" + isActive("/communities")}>
                              <div class="color-box-icon">
                                <span>Eating<br></br>Disorder</span>
                                <img src="/color-box-image-3.png" alt=""/>
                              </div>
                            </a>
                          </Link>
                          </li>
                          <li>
                            <Link href="/communities">
                            <a className={"nav-link" + isActive("/communities")}>
                              <div class="color-box-icon">
                                <span>Weight<br></br>Issues</span>
                                <img src="/color-box-image-4.png" alt=""/>
                              </div>
                            </a>
                          </Link>
                          </li>
                          <li>
                            <Link href="/communities">
                            <a className={"nav-link" + isActive("/communities")}>
                              <div class="color-box-icon">
                                <span>Heart<br></br>Disease</span>
                                <img src="/color-box-image-5.png" alt=""/>
                              </div>
                            </a>
                          </Link>
                          </li>
                          <li>
                            <Link href="/communities">
                            <a className={"nav-link" + isActive("/communities")}>
                              <div class="color-box-icon">
                                <span>Anxiety</span>
                                <img src="/color-box-image-6.png" alt=""/>
                              </div>
                            </a>
                          </Link>
                          </li>
                          <li>
                            <Link href="/communities">
                            <a className={"nav-link" + isActive("/communities")}>
                              <div class="color-box-icon">
                                <span>Depression</span>
                                <img src="/color-box-image-7.png" alt=""/>
                              </div>
                            </a>
                          </Link>
                          </li>
                          <li>
                            <Link href="/communities">
                            <a className={"nav-link" + isActive("/communities")}>
                              <div class="color-box-icon">
                                <span>Insecurity</span>
                                <img src="/color-box-image-8.png" alt=""/>
                              </div>
                            </a>
                          </Link>
                          </li>
                          <li>
                            <Link href="/communities">
                            <a className={"nav-link" + isActive("/communities")}>
                              <div class="color-box-icon">
                                <span>Mental Health</span>
                                <img src="/color-box-image-9.png" alt=""/>
                              </div>
                            </a>
                          </Link>
                          </li>
                          <li>
                            <Link href="/communities">
                            <a className={"nav-link" + isActive("/communities")}>
                              <div class="color-box-icon">
                                <span>Stress</span>
                                <img src="/color-box-image-10.png" alt=""/>
                              </div>
                            </a>
                          </Link>
                          </li>
                          <li>
                            <Link href="/communities">
                            <a className={"nav-link" + isActive("/communities")}>
                              <div class="color-box-icon">
                                <span>Smoking</span>
                                <img src="/color-box-image-11.png" alt=""/>
                              </div>
                            </a>
                          </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="nav-item">
                        <Link href="/article">
                        <a className={"nav-link" + isActive("/article")}>
                        Article
                          </a>
                        </Link>
                      </li>
                      <li className="nav-item header-btn">
                        <Link href="/post-story">
                        <a className={"nav-link" + isActive("/post-story")}>
                        Post a Story
                          </a>
                        </Link>
                      </li>
                      <li className="nav-item header-btn">
                        <Link href="/post-article">
                          <a className={"nav-link" + isActive("/post-article")}>
                          Post an Article
                          </a>
                        </Link>
                      </li>
                      
                    
                    </ul>
                    <div className="header-right">
                      <>
                        {auth.user.username ? (
                          <ul>
                            <li className="search-icon">
                              
                                <Link href="/search">
                                  <a>
                                    <img src="/search-icon.svg" alt="search" />
                                  </a>
                                </Link>
                          
                            </li>
                            <li
                              className="notification-icon"
                              onClick={handleClick}
                            >
                              {!newNoti ? (
                                <a>
                                  <img
                                    src="/notification-icon.svg"
                                    alt=""
                                    style={{ cursor: "pointer" }}
                                  />
                                </a>
                              ) : (
                                <img
                                  src="/notification-icon.svg"
                                  alt=""
                                  style={{ cursor: "pointer" }}
                                />
                              )}
                            </li>

                            {anchorEl && (
                              <NotiUi
                                notifications={notifications}
                                loader={loader}
                                fetchData={fetchData}
                                setShow={setShow}
                                setNewNoti={setNewNoti}
                                anchorEl={anchorEl}
                                handleClose={handleClose}
                                size={size}
                                setSize={setSize}
                              />
                            )}

                            <li>
                              <div className="use-profile">
                               
                                <div className={`image-holder image-Short`}>
                                  <Link
                                    href={{
                                      pathname: `/user/[id]/[username]`,
                                      query: {
                                        id: auth.user.user_id,
                                        username: auth.user.username,
                                      },
                                    }}
                                  >
                                    <a>
                                    <img
                                    className="img-fluid" src="/profile.png"
                                    alt=""
                                    style={{ cursor: "pointer" }}
                                  />
                                    </a>
                                  </Link>
                                </div>
                                <div className="text-box ml-2">
                                  <h3>
                                    <Link
                                      href={{
                                        pathname: `/user/[id]/[username]`,
                                        query: {
                                          id: auth.user.user_id,
                                          username: auth.user.username,
                                        },
                                      }}
                                    >
                                      <a>{auth.user.username}</a>
                                    </Link>
                                  </h3>
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
                              <a href="/register">Sign Up</a>
                            </li>
                          </ul>
                        )}
                      </>
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

export default Navbar;
