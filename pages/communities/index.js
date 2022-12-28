/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import HeadData from "../../component/HeadData";
import communityData from "../../store/consts/community";
const communities = () => {
  return (
    <div>
      <HeadData />
      <div className="appContent communities-page">
        <div className="wrapper">
          <div className="container">
            <div className="pre-login-inner">
              <div className="related-articles">
                <h3>Communities</h3>
                <div className="row">
                  {communityData.map((info, index) => (
                    <div
                      key={index}
                      className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6"
                    >
                      <Link
                        href={
                          `/communities/story/${info.community_id}/${info.community_title.replace(/\s/g, "-")}`
                        }
                      >
                        <a>
                          <div className="related-articles-box">
                            <div className="image-holder">
                              <img
                                src={`/com/${info.community_id}.png`}
                                alt="community"
                              />
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default communities;
