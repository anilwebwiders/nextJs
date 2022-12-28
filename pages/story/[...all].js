import Head from "next/head";
import { getAll } from "../../utils/api-client";
import StoryDetails from "../../component/Story/StoryDetails/StoryDetails";
import ArticleRight from "../../component/Article/ArticleRight/ArticleRight";
import RelatedStory from "../../component/Story/StoryDetails/RelatedStory";
import NotFound from "../404";
import { parseCookies } from "../../lib/parseCookie";
// import { userId } from "../../store/auth/actions";
const postDetails = (props) => {
console.log(props.data.files)
  if (!props.data) return <NotFound />;
  const { title, body, post_thumbnail, community_id } = props.data;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={body
            .substring(0, 150)
            .replace(/<\/?[a-zA-Z]+>/gi, "")
            .replace("&nbsp;", " ")}
        />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={body
            .substring(0, 150)
            .replace(/<\/?[a-zA-Z]+>/gi, "")
            .replace("&nbsp;", " ")}
        />
        <meta property="og:image" content={post_thumbnail} />
        <meta
          name="twitter:card"
          content={body
            .substring(0, 150)
            .replace(/<\/?[a-zA-Z]+>/gi, "")
            .replace("&nbsp;", " ")}
        />
        <meta name="twitter:site" content="https://www.fnmotivation.com/" />
        <meta name="twitter:title" content={title} />
        <meta
          name="twitter:description"
          content={body
            .substring(0, 150)
            .replace(/<\/?[a-zA-Z]+>/gi, "")
            .replace("&nbsp;", " ")}
        />
        <meta name="twitter:image" content={post_thumbnail} />
      </Head>
      <section className=" article-sec">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-12">
              <StoryDetails story={props.data} />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12">
              <ArticleRight articlePage={0} type={community_id} />
            </div>
            
          </div>
        </div>
          <div className="new-recent recent-stories">
			<div className="container-fluid">
			  <div className="row ">
				<RelatedStory type="7" title="Depression" />
			  </div>
			</div>
          </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  // const data = await userId()
  // console.log(data)
  const cookies = parseCookies(context.req);
  const res = await getAll(`storyApi/getStoryDetails?story_id=${context.query.all[0]}&user_id=${cookies?.user_id}`);
  return {
    props: res
     // will be passed to the page component as props
  };
}

export default postDetails;
