import Head from "next/head";

const HeadData = () => {
  return (
    <div>
      <Head>
       <meta 
        name="viewport" 
        content="width=device-width,initial-scale=1, maximum-scale=1.0,user-scalable=0, shrink-to-fit=no" />
        <title>FNMotivation</title>

        <meta
          name="description"
          content=" This new social network is a unique platform that is centered around
        health and wellness. This platform will provide a central location for
        people to like-minded people to connect. These users will be ones who
        are struggling with certain health issues, those who interested in
        connecting with others or simply those who just want to be informed
        about health and wellness. FNMotivation will provide this platform in a
        customer-centered, easy to use interface where people will be able to
        post stories, opinions and information. They will be able to engage with
        other like-minded people by commenting and initiating discussions. This
        platform is different from many other social networks like Facebook or
        twitter as this platform is focused specifically on communication around
        certain health and wellness categories which we call community
        categories."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default HeadData;
