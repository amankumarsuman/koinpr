import { actionType } from "./type";

const initialState = {
  products: [],
  authenticatedUserDetails: {},
  token: {},
  userData: {},
  total: 0,
  orderDetailsData: [],
};
export const CartReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionType.ADD_TO_CART:
      // return {
      //  ...state,
      //   products: {
      //    ...state.products,
      //     [payload.id]: {
      //      ...state.products[payload.id],
      //       quantity: state.products[payload.id].quantity + 1,
      //     },
      // console.log(state.products[payload.id]);
      // const products = state.products[payload.id]
      //   ? {
      //       ...state.products,
      //       [payload.id]: {
      //         ...state.products[payload.id],
      //         quantity: state.products[payload.id].quantity + payload.quantity,
      //       },
      //     }
      //   : {
      //       ...state.products,
      //       [payload.id]: payload,
      //     };

      // return {
      //   ...state,
      //   products: products,
      //   total: state.total + payload.quantity,
      // };
      const { id } = payload;

      // const data=state.products.map((el)=>el?.id===payload?.id)
      const doesItemExist = state?.products?.find((item) => item.id === id);

      if (doesItemExist) {
        // return state?.products.map((item) => {
        //  if(item.id === id){

        return {
          ...state,
        };
        //  }
        // })
      } else {
        // state?.products?.push({
        //   ...payload, quantity: 1
        // })

        return {
          ...state,
          products: [...state.products, payload],
          total: state.total + 1,
        };
      }
    // const products=data?[
    //   ...state.products
    // ]:[
    //   ...state.products,payload
    // ]
    //here data is coming true
    // if(!data) {
    //   return {

    //     ...state
    //   }
    // }
    // console.log(data,"reducer")
    // return{
    //   ...state,
    //   products:[
    //       ...state.products,payload
    //     ],
    //   total:state.total+1
    // }

    // total: state?.products?.total + payload?.quantity,

    // return {
    //   ...state,
    //   products: state.products?.map((product) =>
    //     product.id === payload.id
    //       ? {
    //           ...product,
    //           selected: true,
    //           quantity: product.quantity + payload?.quantity,
    //         }
    //       : [...state?.products, payload]
    //   ),
    //   // total: state?.products?.total + payload?.quantity,
    // };

    case actionType.REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.id
            ? { ...product, selected: false, quantity: 1 }
            : product
        ),
      };
    case actionType.ADD_QUANTITY:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
      };
    case actionType.SUB_QUANTITY:
      // return {
      //   ...state,
      //   products: state.products.map((product) =>
      //     product.id === payload?.id
      //       ? {
      //           ...product,
      //           quantity: product.quantity !== 0 ? product.quantity - 1 : 0,
      //         }
      //       : product
      //   ),
      // };

      // console.log(state.products[payload.id]);
      // const productsId = state.products[payload.id]
      //   ? {
      //       ...state.products,
      //       [payload.id]: {
      //         ...state.products[payload.id],
      //         quantity:
      //           state.products[payload.id].quantity !== 0
      //             ? state.products[payload.id].quantity - payload.quantity
      //             : (state.products[payload.id].quantity = 0),
      //       },
      //     }
      //   : {
      //       ...state.products,
      //       [payload.id]: payload,
      //     };

      // return {
      //   ...state,
      //   products: productsId,
      //   total:
      //     state.total !== 0
      //       ? state.total - payload.quantity
      //       : (state.total = 0),
      // };

      // let quantity_ = state.products[action.payload].quantity;
      return {
        ...state,
        total: state.total - 1,
        products: state.products.filter((item) => {
          return item.id != payload.id;
        }),
      };
    case actionType.EMPTY_CART:
      return {
        ...state,
        products: state.products.map((product) =>
          product.selected
            ? { ...product, selected: false, quantity: 1 }
            : product
        ),
      };
    case actionType.AUTHENTICATED_USER_DETAILS:
      return {
        ...state,
        authenticatedUserDetails: payload,
      };
    case actionType.ORDER_DETAILS:
      return {
        ...state,
        orderDetailsData: [...state.orderDetailsData, payload],
      };
    case actionType.SET_TOKEN_TO_REDUX:
      return {
        ...state,
        token: payload.token,
        authenticatedUserDetails: payload?.data,
      };
    case actionType.SET_USER_DATA_TO_REDUX:
      return {
        ...state,
        userData: payload.data,
        authenticatedUserDetails: payload?.data,
      };

    default:
      return state;
  }
};
