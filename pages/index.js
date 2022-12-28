import { useState } from "react";
import { useSelector } from "react-redux";
import ArticleRight from "../component/Article/ArticleRight/ArticleRight";
import Banner from "../component/Banner/Banner";
import AllStories from "../component/Story/AllStories/AllStories";
import HeadData from "../component/HeadData";
import Subscribe from "../component/Subscribe/Subscribe";
export default function Home() {
  const auth = useSelector((state) => state.auth);

  const [storyPage, setstoryPage] = useState(0);
  const [articlePage, seArticlePage] = useState(0);

  const fetchData = (page) => {
    const pageData = page.selected + 1
    setstoryPage((pageData * 12) - 12)
    seArticlePage((pageData * 4) - 4)
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
      <main>
        {!auth.user.username && <Banner />}
        <section className="article-sec">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-8 col-lg-8 col-md-12">
                <AllStories
                  storyPage={storyPage}
                  fetchData={fetchData}
                  setstoryPage={setstoryPage}
                  seArticlePage={seArticlePage}
                  changeType={changeType}
                  type={type}
                />
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12">
                <ArticleRight
                  articlePage={articlePage}
                  setstoryPage={setstoryPage}
                  seArticlePage={seArticlePage}
                  type={type}
                />
              </div>
            </div>
          </div>
        </section>
        <Subscribe />
      </main>
    </div>
  );
}
