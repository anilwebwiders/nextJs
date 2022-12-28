/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react";
import { Modal } from "reactstrap";
import { getFetchData } from "../../../utils/api-client";
import ModalData from "./ModalData";
import TypeModal from "./TypeModal";
const LoginSubscriptionModal = ({ modal, toggle, auth }) => {
  const checkSubs = useCallback(async () => {
    const data = await getFetchData(
      `userApi/subscription/check?user_id=${auth.user.user_id}`,
      auth.token
    );
    if (data[0].subscribe_newsletter == 0) {
      toggle();
    } 
  }, [auth]);

  useEffect(() => {
    checkSubs();
  }, [checkSubs]);
  const [modalType, setModalType] = useState(false);
  const toggleType = () => setModalType(!modalType);
  return (
    <>
      <Modal isOpen={modal}>
        <div className="categories-modal">
          <ModalData toggle={toggle} auth={auth} toggleType={toggleType} />
        </div>
      </Modal>
      <TypeModal
        toggleType={toggleType}
        modalType={modalType}
        toggle={toggle}
        auth={auth}
      />
    </>
  );
};

export default LoginSubscriptionModal;
