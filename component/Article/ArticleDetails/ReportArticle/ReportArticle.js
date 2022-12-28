import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "reactstrap";
import ReportArticleForm from "./ReportArticleForm";
import DeleteModal from "../../../../component/Modal/Delete/DeleteModal";

const ReportArticle = ({ article_id, user_id, title }) => {
  const auth = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [modalDelete, setModalDelete] = useState(false);

  const redirect = () => {
    window.location = "/articles";
  };
  const [id, setId] = useState(null);
  const toggleDelete = (id) => {
    setModalDelete(!modalDelete);
    setId(id);
  };

  return (
    <div>
      <DeleteModal
        toggleDelete={toggleDelete}
        modalDelete={modalDelete}
        auth={auth}
        title={title}
        type={"article"}
        url={`userApi/page/article?article_id=${id}`}
        redirect={redirect}
      />
      {user_id !== auth.user.user_id && (
        <p className="report" onClick={toggle}>
          Report
        </p>
      )}

      {user_id === auth.user.user_id && (
        <>
          <p onClick={() => toggleDelete(article_id)} className="report">
            Delete
          </p>
        </>
      )}

      <Modal isOpen={modal} toggle={toggle}>
        <ReportArticleForm
          title={title}
          article_id={article_id}
          toggle={toggle}
          user_id={auth.user.user_id}
          auth={auth}
        />
      </Modal>
    </div>
  );
};

export default ReportArticle;
