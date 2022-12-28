import cookie from "cookie";

export function parseCookies(req) {
    // const ISSERVER = typeof window === "undefined";
  return cookie.parse(req ? req?.headers?.cookie || "" :  document?.cookie);
}