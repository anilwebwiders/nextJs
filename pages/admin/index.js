import React, { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";
import PreloaderLg from "../../component/Preloader/PreloaderLg";
import NotFound from "../404";

const Admin = () => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);

  if (auth.loading) return <PreloaderLg />;
  if (auth.user.role === "admin") {
    return <div className="p-5 text-center"><h2>Welcome to DashBoard</h2><br></br>Use Navigation panel to switch pages</div>;
  } else {
    return <NotFound />;
  }
};

export default Admin;
