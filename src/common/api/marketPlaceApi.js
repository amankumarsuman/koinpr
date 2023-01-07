import Cookies from "universal-cookie";
import { instance, PublicConstants } from "./index";
const cookies = new Cookies();

export const marketPlaceApi = {
  
  getUserByTokenInMarketPlace: async ({token} ) => {
    try {
      const auth = cookies.get("auth-token");
      // console.log(auth);
      if (!auth) {
        // navigate("/sign-in");
        return false
      }
      return await instance.post(PublicConstants.getUserByToken, {
            headers: {
              Authorization: "Bearer " + token,
            },
          
      });
    } catch (err) {
      console.log(err);
    }
  },

};
