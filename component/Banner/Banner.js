/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link'
const Banner = () => {
  return (
    <section className="pre-login-banner">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="text-box">
              <h1>Future Now Motivation is a social community</h1>
              <p>
                where everyone can share their stories about their issues for
                others to read, learn, engage and connect.
              </p>
              <a href="/register">REGISTER NOW</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
