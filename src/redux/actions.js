import { marketPlaceApi } from "../common/api/marketPlaceApi";
import { actionType } from "./type";

export const showIndividualMarketplaceData = (payload) => {
  return {
    type: actionType.SHOW_DETAILS_OF_INDIVIDUAL_MARKETPLACE,
    payload: payload,
  };
};

export const addToCart = (payload) => {
  console.log(payload, "payload");
  
  return {
    type: actionType.ADD_TO_CART,
    payload,
  };
};
export const removeFromCart = (payload) => {
  return {
    type: actionType.REMOVE_FROM_CART,
    payload,
  };
};
export const subtractQuantity = (payload) => {
  console.log(payload);
  return {
    type: actionType.SUB_QUANTITY,
    payload,
  };
};
export const addQuantity = (payload) => {
  return {
    type: actionType.ADD_QUANTITY,
    payload,
  };
};
export const emptyCart = () => {
  return {
    type: actionType.EMPTY_CART,
  };
};
export const authenticatedUserDetails = (payload) => {
  return {
    type: actionType.AUTHENTICATED_USER_DETAILS,
    payload,
  };
};
export const SetTokenToRedux = (payload) => {
  return {
    type: actionType.SET_TOKEN_TO_REDUX,
    payload,
  };
};
export const orderDetails = (payload) => {
  return {
    type: actionType.ORDER_DETAILS,
    payload,
  };
};


const getUserByTokenRequest = () => {
  return {
    type: actionType.GET_USER_BY_TOKEN_REQUEST,
  };
};

const getUserByTokenSuccess = (data) => {
  return {
    type: actionType.GET_USER_BY_TOKEN_SUCCESS,
    payload: data,
  };
};

const getUserByTokenFailure = (error) => {
  return {
    type: actionType.GET_USER_BY_TOKEN_FAILURE,
    payload: error,
    meta: {
      type: "error",
      msg: "Failed to get USER BY TOKEN",
    },
  };
};

export const getUserByJwtToken =
  () =>
  async (dispatch) => {
    dispatch(getUserByTokenRequest());

   

    try {
      let res = await marketPlaceApi.getUserByTokenInMarketPlace();
console.log(res,"response")
      let updatedData = await res.data.CannedList?.map((data) => {
        return {
          ...data,
          id: data.code,
        };
      });
      

      if (res.data.success) {
        dispatch(
          getUserByTokenSuccess({
            data: updatedData,
           
          })
        );
      } else {
        dispatch(getUserByTokenFailure("data not found"));
      }
    } catch (error) {
      dispatch(
        getUserByTokenFailure("No Actual Data Found")
      );
    }
  };

