import Cookies from "universal-cookie";
import { instance, PublicConstants } from "./index";
const cookies = new Cookies();

export const marketPlaceApi = {
  
  getUserByTokenInMarketPlace: async ( ) => {
    try {
      const auth = cookies.get("auth-token");
      // console.log(auth);
      if (!auth) {
        // navigate("/sign-in");
        return false
      }
      return await instance.post(PublicConstants.getUserByToken, {
            headers: {
              Authorization: "Bearer " + auth,
            },
          
      });
    } catch (err) {
      console.log(err);
    }
  },

};
