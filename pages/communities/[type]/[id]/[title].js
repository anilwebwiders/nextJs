import Link from "next/link";
import HeadData from "../../../../component/HeadData";
import CommunityStory from "../../../../component/Story/Community/CommunityStory";
import { useState } from "react";
import { useRouter } from "next/router";
import StoryRight from "../../../../component/Story/StoryRight/StoryRight";
import ArticleRight from "../../../../component/Article/ArticleRight/ArticleRight";
import CommunityArticle from "../../../../component/Article/Community/CommunityArticle";

const CommumityDetails = () => {
  const [storyPage, setstoryPage] = useState(0);
  const [articlePage, seArticlePage] = useState(0);

  const fetchData = (page) => {
    setstoryPage(storyPage + 12);
    seArticlePage(articlePage + 4);
  };

  const router = useRouter();
  const { type, id  } = router?.query;

  return (
    <div>
      <HeadData />
      <section className="article-sec communities-sec">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-9 col-lg-8 col-md-12">
              {type === "story" && (
                <CommunityStory storyPage={storyPage} fetchData={fetchData} />
              )}
              {type === "article" && (
                <CommunityArticle
                  articlePage={articlePage}
                  fetchData={fetchData}
                  type={id}
                />
              )}
            </div>
            <div className="col-xl-3 col-lg-4 col-md-12">
              {type === "story" && <ArticleRight articlePage={articlePage} type={id}/>}
              {type === "article" && <StoryRight storyPage={storyPage} type={id}/>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps({ query }) {
  return {
    props: { story: [], article: [] }, // will be passed to the page component as props
  };
}

export default CommumityDetails;
