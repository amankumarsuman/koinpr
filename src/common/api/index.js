import  Axios from "axios";
// import { getLocalStorage } from "../utils/utils";

export const instance = Axios.create({
  baseURL:"http://user.koinpr.com",
  
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  redirect: "follow", // manual, *follow, error
  referrerPolicy: "no-referrer",
  headers: {
    "Content-Type": "application/json,text/plain",
    //"Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    // "Access-Control-Allow-Origin": "https://localhost:3000",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
});
export const instanceToPost = Axios.create({
  baseURL:"http://user.koinpr.com",
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  redirect: "follow", // manual, *follow, error
  referrerPolicy: "no-referrer",
  headers: {
    "Content-Type": "application/json,text/plain",
    //"Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    // "Access-Control-Allow-Origin": "https://localhost:3000",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  },
  transformRequest: [
    function (data) {
      return `${JSON.stringify({
        ...data,
        // techsessionkey: getLocalStorage("token").toString(),
      })}`;
    },
  ],
});

export const uploadInFormInstance = Axios.create({
  baseURL: "http://user.koinpr.com",
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, *same-origin, omit
  redirect: "follow", // manual, *follow, error
  referrerPolicy: "no-referrer",
  headers: {
    // "Content-Type": "application/json,text/plain",
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Origin": "https://localhost:3000",

    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    techSessionKey: localStorage.getItem("techSessionKey"),
  },
});

// the commit check
export class PublicConstants {
  static getUserByToken = "/api/user/get-user-by-token";
 
}
