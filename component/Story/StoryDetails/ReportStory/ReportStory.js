import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Modal } from "reactstrap";
import ReportStoryForm from "./ReportStoryForm";
import DeleteModal from "../../../../component//Modal/Delete/DeleteModal";

const ReportStory = ({ story_id, user_id, title }) => {
  const auth = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [modalDelete, setModalDelete] = useState(false);
  const redirect = () => {
    window.location = "/";
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
        type={"story"}
        url={`userApi/page/story?story_id=${id}`}
        redirect={redirect}
      />
      {user_id !== auth.user.user_id && <p className="report" onClick={toggle}>
        Report
      </p>}

      {user_id === auth.user.user_id && (
        <>
          <Link
            href={{ pathname: "/story/edit/[id]", query: { id: story_id } }}
          >
            <a className="report">Edit</a>
          </Link>

          <p onClick={() => toggleDelete(story_id)} className="report">
            Delete
          </p>
        </>
      )}

      <Modal isOpen={modal} toggle={toggle}>
        <ReportStoryForm
          title={title}
          story_id={story_id}
          toggle={toggle}
          user_id={auth.user.user_id}
          auth={auth}
        />
      </Modal>
    </div>
  );
};

export default ReportStory;
