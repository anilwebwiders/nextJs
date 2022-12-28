import React, { useState } from "react";
import AllArticle from "../../component/Article/AllArticle/AllArticle";
import HeadData from "../../component/HeadData";
import StoryRight from "../../component/Story/StoryRight/StoryRight";

const Article = () => {
  // const [articlePage, setArticlePage] = useState(0);
  // const fetchData = (page) => {
  //   const pageData = page.selected + 1;
  //   setArticlePage(pageData * 12 - 12);
  // };

  const [storyPage, setstoryPage] = useState(0);
  const [articlePage, seArticlePage] = useState(0);

  const fetchData = (page) => {
    const pageData = page.selected + 1;
    setstoryPage(pageData * 12 - 12);
    seArticlePage(pageData * 4 - 4);
  };
  const [type, setType] = useState(0);
  const changeType = (e) => {
    setType(e.target.value);
    setstoryPage(0);
    seArticlePage(0);
  };

  return (
    <div>
      <HeadData />
      <div>
        <section className="article-sec article-feed">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12">
                <AllArticle
                  articlePage={articlePage}
                  fetchData={fetchData}
                  setstoryPage={setstoryPage}
                  seArticlePage={seArticlePage}
                  changeType={changeType}
                  type={type}
                />
              </div>
              {/* <div className="col-xl-3 col-lg-4 col-md-12">
                <StoryRight
                  storyPage={storyPage}
                  setstoryPage={setstoryPage}
                  seArticlePage={seArticlePage}
                  type={type}
                />
              </div> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Article;
