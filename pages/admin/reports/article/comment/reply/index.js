import React, { useCallback, useEffect, useState } from "react";
import { FaCalendarMinus, FaArchive } from "react-icons/fa";
import Preloader from "../../../../../../component/Preloader/Preloader";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteData,
  getFetchData,
  patchData,
} from "../../../../../../utils/api-client";
import PreloaderLg from "../../../../../../component/Preloader/PreloaderLg";
import NotFound from "../../../../../404";
import { notifySuccess, notifyError } from "../../../../../../store/notify/action";

const AdminStoryReportsCommentReply = ({}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const fetchData= () => {
    setPage(page + 12);
  };
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleStatus = (data) => {
    setPage(0);
    setData([]);
    setStatus(data);
  };
  const [data, setData] = useState([]);
  const [count, setCount] = useState([]);
  const get = useCallback(async () => {
    if (auth.user.user_id) {
      setLoading(true);
      const articlesCommentReply = await getFetchData(
        `adminApi/reports/article/comment/reply?status=${status}&page=${page}`,
        auth.token
      );
      setCount(articlesCommentReply.count);
      setData([...data, ...articlesCommentReply.articleCommentReply]);
      setLoading(false);
    }
  }, [page, status]);

  useEffect(() => {
    get();
  }, [get]);

  const [banLoader, setBanLoader] = useState(null);
  const [value, setValue] = useState(null);
  const deleteStoryComment = async (id) => {
    setBanLoader(id);
    const data = await deleteData(
      `articleApi/comment/reply?ac_reply_id=${id}`,
      auth.token
    );
    get();
    setBanLoader(null);

    if (data.err) return dispatch(notifyError(data.err));
    if (data.success) return dispatch(notifySuccess(data.success));
  };
  if (auth.loading) return <PreloaderLg />;
  if (auth.user.role === "admin") {
    return (
      <section className="m-2">
        <div className="nav-admin text-center">
          <div className="d-flex justify-content-center">
            <h3 className="admin-box-inactive bg-danger">
              <FaCalendarMinus color="white" className="m-2" />
              Article Comment Reply Reports: {loading ? <Preloader /> : count}
            </h3>
          </div>
        </div>

        <table className="table table-data">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Owner</th>
              <th scope="col">Cause</th>
              <th scope="col">Reporter</th>
              <th scope="col">StoryStatus</th>
            </tr>
          </thead>
          {data.map((rep) => (
            <tbody key={rep.report_id}>
              <tr>
                <td>{rep.ac_reply_id}</td>

                <td>
                  <Link
                    href={
                      "/story/" +
                      rep.article_id
                    }
                  >
                    <a>{rep.ac_reply_text}</a>
                  </Link>
                </td>

                <td>
                  <Link
                    href={
                      "/user/" +
                      rep.reply_owner_id +
                      "/" +
                      rep.reply_owner_username
                    }
                  >
                    <a>{rep.reply_owner_fullname}</a>
                  </Link>
                </td>

                <td>{rep.report_msg}</td>

                <td>
                  {" "}
                  <Link
                    href={
                      "/user/" +
                      rep.reporter_user_id +
                      "/" +
                      rep.reporter_username
                    }
                  >
                    <a>{rep.reporter_fullname}</a>
                  </Link>
                </td>

                <td>
                  {banLoader === rep.story_id ? (
                    "...processing..."
                  ) : (
                    <div className="dropdown">
                      <select
                        className="btn btn-outlined-danger"
                        name="status"
                        onClick={() => setValue(rep.report_id)}
                        onChange={() =>
                          deleteStoryComment(rep.ac_reply_id)
                        }
                      >
                        <option
                          selected={rep.is_resolved == "0"}
                          className="text-success"
                          value="0"
                        >
                          Active
                        </option>
                        <option
                          selected={rep.is_resolved == "1"}
                          className="text-danger"
                          value="1"
                        >
                          Deleted
                        </option>
                      </select>
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <h4
          className="text-warning text-center"
          style={{ cursor: "pointer" }}
          onClick={fetchData}
        >
          {loading ? <Preloader /> : "Show More"}
        </h4>
      </section>
    );
  } else {
    return <NotFound />;
  }
};

export default AdminStoryReportsCommentReply;
