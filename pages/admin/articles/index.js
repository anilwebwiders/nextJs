import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { BsBookHalf } from "react-icons/bs";
import { useSelector } from "react-redux";
import ArticlesData from "../../../component/Admin/Articles/ArticlesData";
import Preloader from "../../../component/Preloader/Preloader";
import PreloaderLg from "../../../component/Preloader/PreloaderLg";
import { getFetchData } from "../../../utils/api-client";
import NotFound from "../../404";
const AdminArticles = () => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const [load, setLoad] = useState(false);
  const [active, setActive] = useState(0);
  const [inActive, setInActive] = useState(0);
  const getCount = useCallback(async () => {
    if (auth.token) {
      setLoad(true);
      const data = await getFetchData(`adminApi/articles/count`, auth.token);
      
      setActive(data.active);
      setInActive(data.inActive);
      setLoad(false);
    }
  }, [auth]);

  useEffect(() => {
    getCount();
  }, [getCount]);
  if (auth.loading) return <PreloaderLg />;
  if (auth.user.role === "admin") {
  return (
    <div>
      <div className="nav-admin text-center">
        <h1>All Articles</h1>
        <div className="d-flex justify-content-center p-3">
          <h3 className="admin-box-active bg-success">
            <BsBookHalf color="white" className="m-2" /> Active:
            {load ? <Preloader /> : active}
          </h3>
          <h3 className="admin-box-inactive bg-danger">
            <BsBookHalf color="white" className="m-2" /> Inactive:
            {load ? <Preloader /> : inActive}
          </h3>
        </div>
        <ArticlesData getCount={getCount}/>
      </div>
    </div>
  )}else{
    return <NotFound />;
  }
};

export default AdminArticles;
