import Head from "next/head";
const about = () => {
  return (
    <>
      <Head>
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
      <section className="contact-us-section">
          <div className="container-fluid">
              <div className="row">
                  <div className="col-lg-12">
                      <div className="about-fnm">
                          <div className="about-fnm-img">
                              <img src="/img1.png" alt=""/>
                          </div>
                          <div className="about-fnm-text">
                              <div className="about-fnm-text-container">
                                <h2 className="about-fnm__title">About Fnm</h2>
                                <h3 className="about-fnm__sub__title">Social Network Platform for People focused on Health and Wellness</h3>
                                <p>This new social network is a unique platform that is centered around health and wellness. This platform will provide a central location for people to like-minded people to connect. These users will be ones who are struggling with certain health issues, those who interested in connecting with others or simply those who just want to be informed about health and wellness. FNMotivation will provide this platform in a customer-centered, easy to use interface where people will be able to post stories, opinions and information. They will be able to engage with other like-minded people by commenting and initiating discussions. This platform is different from many other social networks like Facebook or twitter as this platform is focused specifically on communication around certain health and wellness categories which we call community categories.</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="row">
                 <div className="col-lg-12">
                  <div className="body-content">
                     <div className="body-content__top">
                       <h2 className="title">The Community Categories are:</h2>
                       <p>Heart Disease, Smoking, Weight Issues, Drug Addiction, Alcohol Addiction, Stress, Depression, Anxiety, Insecurity, Eating Disorder and Mental Health</p>
                       <h2 className="title">Types of Users</h2>
                       <p>There are different kinds of users that will be interested in such a platform and will have the opportunity to use it according to their needs.</p>
                     </div>
                     <div className="bg-content">
                         <p><span>1. The Patient:</span> Users who are currently struggling with issues relating to the categories:</p>
                         <p>a. These users will be able to use the platform to post stories and content about their issues, their journey, look for help and/or just vent about these issues.</p>
                     </div>
                     <div className="bg-content">
                         <p><span>2. The Survivor: </span>Users who are not currently struggling with the issues but would like to connect to others who are or were facing these issues:</p>
                         <p>a. These users may have had issues in the past but have managed to overcome these issues. They would like to connect with other to tell them their stories, journeys and give tips and advice to those that are struggling as well.</p>
                         <p>b. They may want to connect with others who have overcome their issues just like them.</p>
                     </div>
                     <div className="bg-content">
                       <p><span>3. The Friend: </span>  Users who are currently supporting someone that has issues/struggling and want to use the platform to vent and express themselves and connect with others that are not struggling.</p>
                       <p>a. These users are like close family and friends and want to connect with other people in similar situations to get ideas on how they can better support their loved ones and network.</p>
                   </div>
                   <div className="bg-content">
                       <p><span>4. The Informed one: </span> Those who have no issues but just want to learn, be more informed or are curious of the struggles and issues of others.</p>
                       <p>a. These are people who have an interest in the field and want to learn more about the issues people are facing.</p>
                       <p>b. They may be students who are studying about these issues.</p>
                   </div>
                   <div className="bg-content">
                       <p><span>5. Companies and businesses</span></p>
                       <p>a. These are companies, organizers or service providers that provide services or support to people struggling with these issues and want to use the platform to connect with users and grow their brand.</p>
                   </div>
                 </div>
                 </div>
              </div>
          </div>
      </section>
    </>
  );
};

export default about;
