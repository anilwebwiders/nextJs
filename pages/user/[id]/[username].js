/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import HeadData from "../../../component/HeadData";
import PreloaderLg from "../../../component/Preloader/PreloaderLg";
import GuestUser from "../../../component/User/GuestUser/GuestUser";
import ProfileUser from "../../../component/User/ProfileUser/ProfileUser";
import { parseCookies } from "../../../lib/parseCookie";
import { getAll } from "../../../utils/api-client";


const User = (props) => {
  const user = props.user[0];
  const auth = useSelector((state) => state.auth);
  console.log(auth)
  useEffect(() => {
    const log = localStorage.getItem("loggedIn");

    if(!log) return router.push('/login')
}, []);

  const router = useRouter();
  if (auth.loading) return <PreloaderLg />;
  if (auth.user.user_id) {
    return (
      <div>
        <HeadData />
        {auth.user.user_id == router.query.id ? (
          <ProfileUser />
        ) : (
          <GuestUser user={user} />
        )}
      </div>
    );
  } else {
    return <PreloaderLg />;
  }
};

export async function getServerSideProps(context) {
  const data = await getAll(`userApi/${context.query.id}`);
  return {
    props: { user: data.data }, // will be passed to the page component as props
  };
}

export default User;
