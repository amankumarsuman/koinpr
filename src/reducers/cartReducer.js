const initialState = [{id:'123', qty:2}];

const cartReducer = (state=initialState, action) =>{
    switch(action.type){
        case 'ADD_TO_CART': 
            const inCart = state.cart.find(prod=> prod.id === action.payload.id? true: false);
            return{
                ...state,
                cart: inCart 
                ? state.cart.map(item => 
                    item.id === action.payload.id 
                        ? {...item, qty:item.qty+1}: 
                            item
                    ) 
                : [...state.cart, {id: action.payload.id, qty:1}]
            }
        case 'REMOVE_FROM_CART': 
            return {...state };
        default:
            return state; 
    }
}

export default cartReducer;
