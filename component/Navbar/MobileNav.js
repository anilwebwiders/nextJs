import React from "react";
import Link from "next/link";
const MobileNav = ({ openNav }) => {

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
        <Link href="/">
          <a className="close_btn" data-dismiss="modal">
            <li className="p-3">X</li>
          </a>
        </Link>

        <Link href="/">
          <a>
            <li className="p-3">Home</li>
          </a>
        </Link>

        <Link href="/post-story">
          <a>
            <li className="p-3">Post Story</li>
          </a>
        </Link>
        <Link href="/post-article">
          <a>
            <li className="p-3">Post News Article</li>
          </a>
        </Link>

        <Link href="/communities">
          <a>
            <li className="p-3">Communitites</li>
          </a>
        </Link>
         
      </div>
    </div>
  );
};

export default MobileNav;
