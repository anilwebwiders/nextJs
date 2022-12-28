import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { browserName, CustomView } from "react-device-detect";
import Cookie from "js-cookie";

const MobileAdminNav = ({ openNav }) => {

    const logOut = () => {
      Cookie.remove("user_id");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("loggedIn");
      window.location = "/login";
    };
  return (
    <div
      className="d-flex align-items-center justify-content-center position-fixed"
      style={{
        height: "100%",
        width: "100%",
        zIndex: "10",
        position: "absolute",
        overflowY: "hidden",
        overflowX: "hidden",
        backgroundColor: "rgba(0, 0, 0, 0.733)",
      }}
    >
      <div
        className="mb-nav text-white"
        style={{ listStyle: "none", fontSize: "20px", textAlign: "center" }}
        onClick={openNav}
      >
        <Link href="/admin/users">
          <a>
            <li className="p-3">Users</li>
          </a>
        </Link>

        <Link href="/admin/stories">
          <a>
            <li className="p-3">Stories</li>
          </a>
        </Link>
        <Link href="/admin/articles">
          <a>
            <li className="p-3">Articles</li>
          </a>
        </Link>

        <Link href="/admin/reports">
          <a>
            <li className="p-3">Reports</li>
          </a>
        </Link>
        <a>
          <li className="p-3" onClick={logOut}>Log Out</li>
        </a>
      </div>
    </div>
  );
};

export default MobileAdminNav;
