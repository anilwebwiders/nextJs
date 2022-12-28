import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { BsBookHalf, BsChatSquareDotsFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import Preloader from "../../../component/Preloader/Preloader";
import PreloaderLg from "../../../component/Preloader/PreloaderLg";
import { getFetchData } from "../../../utils/api-client";
import NotFound from "../../404";
import Link from "next/link";
const AdminReports = () => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const [load, setLoad] = useState(false);
  const [active, setActive] = useState([]);
  const getCount = useCallback(async () => {
    if (auth.token) {
      setLoad(true);
      const data = await getFetchData(`adminApi/reports/count`, auth.token);
      setActive(data);
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
          <h1>Reports</h1>
          <div className="d-flex justify-content-center p-3">
            <Link href="/admin/reports/story">
              <a>
                <h3 className="admin-box-active bg-primary">
                  <BsBookHalf color="white" className="m-2" /> Story:
                  {load ? <Preloader /> : active.story}
                </h3>
              </a>
            </Link>
            <Link href="/admin/reports/story/comment">
              <a>
                <h3 className="admin-box-inactive bg-success">
                  <BsChatSquareDotsFill color="white" className="m-2" />{" "}
                  Comment:
                  {load ? <Preloader /> : active.sComment}
                </h3>
              </a>
            </Link>
            <Link href="/admin/reports/story/comment/reply">
              <a>
                <h3 className="admin-box-inactive bg-info">
                  <BsChatSquareDotsFill color="white" className="m-2" /> Reply:
                  {load ? <Preloader /> : active.sCommentR}
                </h3>
              </a>
            </Link>
          </div>
          <div className="d-flex justify-content-center p-3">
            <Link href="/admin/reports/article">
              <a>
                <h3 className="admin-box-active bg-primary">
                  <BsBookHalf color="white" className="m-2" /> Article:
                  {load ? <Preloader /> : active.article}
                </h3>
              </a>
            </Link>
            <Link href="/admin/reports/article/comment">
              <a>
                <h3 className="admin-box-inactive bg-success">
                  <BsChatSquareDotsFill color="white" className="m-2" />{" "}
                  Comment:
                  {load ? <Preloader /> : active.aComment}
                </h3>
              </a>
            </Link>
            <Link href="/admin/reports/article/comment/reply">
              <a>
                <h3 className="admin-box-inactive bg-info">
                  <BsChatSquareDotsFill color="white" className="m-2" /> Reply:
                  {load ? <Preloader /> : active.aCommentR}
                </h3>
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default AdminReports;
