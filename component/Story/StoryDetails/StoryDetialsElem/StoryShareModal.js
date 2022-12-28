/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Modal } from "reactstrap";
import {
  EmailIcon,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import EmailShare from 'react-email-share-link'
const StoryShareModal = ({ open, toggle, title, story_id }) => {

  const url = `${process.env.BASE_URL}/story/${story_id}/${title.substring(0, 60).replace(/\s/g, "-")}`

  return (
    <Modal isOpen={open} toggle={toggle}>
      <div className="categories-modal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true" onClick={toggle}>
                  <img src="/closs-icon.svg" alt="close" />
                </span>
              </button>
              <div className="text-center">
                <h3>Share This Post</h3>
                <FacebookShareButton
                  className="mt-3"
                  url={url}
                  appid={182933076457767}
                >
                  <FacebookIcon size={50} round={true} />
                </FacebookShareButton>
                <TwitterShareButton
                  className="ml-2"
                  body="Hey, I would like to share with you a post from FNMotivation."
                  url={url}
                  appid={360186812075686}
                >
                  <TwitterIcon size={50} round={true} />
                </TwitterShareButton>

                <EmailShare subject={`FNMotivation-${title}`}

                                body={
                                    `Hey,

I would like to share with you a post from FNMotivation. 

Title: ${title}
${url}`}>

                                {link => (
                                    <a href={link} data-rel="external"><EmailIcon className="ml-2" size={50} round={true} /></a>
                                )}
                            </EmailShare>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StoryShareModal;
