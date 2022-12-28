/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import ReportStoryForm from "../ReportStory/ReportStoryForm";
import { useSelector } from "react-redux";
import { Modal } from "reactstrap";
const ReportModelNew = ({ story }) => {
    const auth = useSelector((state) => state.auth);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <>
            <li><a onClick={toggle}>Report</a></li>
            {open && (
                <Modal isOpen={modal} toggle={toggle}>
                    <ReportStoryForm
                    title={story.title}
                    story_id={story.id}
                    toggle={toggle}
                    user_id={auth.user.user_id}
                    auth={auth}
                    />
                </Modal>
            )}
        </>
    );
};

export default ReportModelNew;