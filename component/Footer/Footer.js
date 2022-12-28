/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import moment from "moment";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="">
          <div className="">
            <div className="footer-logo">
              <Link href="/">
              <a>
                <img src="/footer_logo.png" alt="" className="img-fluid" />
              </a>
              </Link>
              
              {/* <div className="copyright">
                <p>&copy;All Rights Reserved {moment(new Date()).format("YYYY")}</p>
              </div> */}
            </div>
          </div>
          <div className="">
            <div className="footer-link">
              <ul>
                <li>
                  <a href="/about">
                    <a>About FNM</a>
                  </a>
                </li>
                <li>
                    <a href="/contact">Contact</a>
                </li>
                <li>
                    <a href="/privacy-policy">Privacy Policy</a>
                </li>
                <li>
                    <a href="/terms-and-conditions">Terms and Conditions</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="">
            <ul className="footer-links">
            <a
                target="_blank"
                rel="noreferrer"
                href="https://www.facebook.com/FNMotivation/"
              >
                <img src="/facebook-icon.svg" alt="facebook" />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/FNMotivation1"
              >
                <img src="/twitter.svg" alt="twitter" />
              </a>
              {/* <a
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/company/fnmotivation/"
              >
                <img src="/linkdin-icon.svg" alt="linkedIn" />
              </a> */}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.instagram.com/Futurenowmotivation/"
              >
                <img src="/instagram.svg" alt="instagram" />
              </a>
           
            </ul>
          </div>
        </div>
        <div className="copyright mobile-version">
          <p>&copy;All Rights Reserved {moment(new Date()).format("YYYY")} by <span>FN Motivation</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
