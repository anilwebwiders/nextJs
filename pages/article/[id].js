/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import ArticleDetails from "../../component/Article/ArticleDetails/ArticleDetails";
import StoryRight from "../../component/Story/StoryRight/StoryRight";
import { parseCookies } from "../../lib/parseCookie";
import { getAll } from "../../utils/api-client";
import NotFound from "../404";

const ArticlePage = (props) => {
  if(!props.data) return(<NotFound/>)
  const {title, description, img_link, community_id } =props.data

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={img_link} />
        <meta
          name="twitter:card"
          content={description}
        />
        <meta name="twitter:site" content="https://www.fnmotivation.com/" />
        <meta name="twitter:title" content={title} />
        <meta
          name="twitter:description"
          content={description}
        />
        <meta name="twitter:image" content={img_link} />
      </Head>
      <section className="article-sec article-details article-de-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <ArticleDetails article={props.data}/>
            </div>
            {/* <div className="col-xl-3 col-lg-4 col-md-12">
            <StoryRight
                  storyPage={0}
                  type={community_id}
                />
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  const article_id = context.query.id
  const cookies = parseCookies(context.req);
  const res = await getAll(
    `articleApi/getArticleDetails?article_id=${article_id}&user_id=${cookies?.user_id}`
  );
  
  return {
    props:  res, // will be passed to the page component as props
  };
}

export default ArticlePage;
