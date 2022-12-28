/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import PreloaderLg from "../../Preloader/PreloaderLg";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import ProfileRoute from "./ProfileRoute";
import { useRouter } from "next/router";
import { browserName, CustomView } from "react-device-detect";


const ProfileUser = () => {
  const ISSERVER = typeof window === "undefined";
  console.log(ISSERVER);
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  
  const logOut = () => {
    Cookie.remove("user_id");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("loggedIn");
    window.location = "/login";
  };
  return (
    
    <div>
      {auth.user.username ? (
        <div className="wrapper">
        <div className="innerbanner__img" id="imagePreview2">
        <label className="upload-picture">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-camera-fill" viewBox="0 0 16 16"><path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"></path><path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"></path></svg>
                      <input type="file"/>
                    </label>
          </div>
        <section className="profile-sec edit-profile dgfhdh profile_custom">
          <section className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="profile-inner">
                  <div className="image-holder">
                    <img
                      src={auth.user.avatar}
                      alt=""
                      className="img-fluid"
                    />
                    <label className="upload-picture">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-camera-fill" viewBox="0 0 16 16"><path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"></path><path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"></path></svg>
                      <input type="file"/>
                    </label>
                  </div>
                  <div className="profile-right">
                    <div className="text-box">
                      <div className="profile-btn">
                      <div>
                      <h3>{auth.user.full_name}</h3>
                      <h4>@{auth.user.username}</h4>
                        </div>
                        <div>
                        <ul>
                        <li>
                          <Link
                            href={{
                              pathname: `/user/[id]/[username]/edit`,
                              query: {
                                id: auth.user.user_id,
                                username: auth.user.username,
                              },
                            }}
                          >
                            <a className="edit-btn">Edit profile</a>
                          </Link>
                        </li>
                        <li>
                          <a className="edit-btn logout" onClick={logOut}>
                            Log Out
                          </a>
                        </li>
                      </ul>
                        </div>
                        </div>
                      <p>
                      {auth.user.about &&
                          auth.user.about.replace(/%comma%/g, "'")}
                      </p>
                      
                     
                    </div>
                  </div>
                </div>
                <ProfileRoute />
              </div>
            </div>
          </section>
        </section>
        </div>
      ) : (
        <PreloaderLg />
      )}
    </div>
  );
};

export default ProfileUser;
