/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { getAll } from "../../../utils/api-client";
import CommonStory from "./commonStory/CommonStory";
import Preloader from "../../Preloader/Preloader";
import Paginate from "../../Paginate/Paginate";
import ModalData from "../../Subscribe/LoginSubscription/ModalData";
import { Modal } from "reactstrap";

const SubscribedStory = ({ type, fetchData, storyPage, auth }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [loader, setloader] = useState(true);
  const [stories, setStories] = useState([]);
  const [storyCount, setStoryCount] = useState([]);

  const pageCount = Math.ceil(storyCount / 12);

  const getSubscribedStory = useCallback(async () => {
    if (auth.user.user_id) {
      setloader(true);
      const data = await getAll(
        `storyApi/subscribed?type=${type}&user_id=${auth.user.user_id}&page=${storyPage}`
      );
      setStories(data.data);
      setStoryCount(data.count);
      setloader(false);
    }
  }, [storyPage, type, auth]);

  useEffect(() => {
    getSubscribedStory();
  }, [getSubscribedStory]);

  return (
    <div>
      {loader ? (
        <div className="article-stories-box">
          <span className="text-center">
            <Preloader />
          </span>
        </div>
      ) : stories?.length === 0 ? (
        <div className="text-center">
          <p className="p-5">
            There are currently no active posts from categories that you are
            subscribed to, you can add or update your community category
            subscription by going here:
          </p>
          <div className="d-flex justify-content-center">
            <button className="main-btn" onClick={toggle}>
              Add Categories
            </button>
          </div>
          {auth.user.username && (
            <Modal isOpen={modal}>
              <div className="categories-modal">
                <ModalData toggle={toggle} auth={auth} />
              </div>
            </Modal>
          )}
        </div>
      ) : (
        <CommonStory story={stories} />
      )}
      <Paginate pageCount={pageCount} fetchData={fetchData} />
    </div>
  );
};

export default SubscribedStory;
