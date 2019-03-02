import * as types from "../actions/types";

const initialState = {
    cart: [],
    totalCounter: 0,
    totalPrice: 0
};

const shoppingCart = (state = initialState, action) => {
    switch (action.type) {

        case types.ADD_PRODUCT_CART:
            let newCart = state.cart.slice();
            let totalPrice = state.totalPrice;
            let totalCounter = state.totalCounter
            // findIndex return 1 or -1 
            let selected = newCart.findIndex(
                item => item.id === action.payload.id
            )
            if (selected >= 0) {

                if (action.payload.counter + newCart[selected].counter < 0) return state;

                let addNewObj = action.payload
                newCart[selected].counter += action.payload.counter

                newCart[selected].priceOfProdut = newCart[selected].price * newCart[selected].counter
                // totalPrice += +action.payload.price



            } else {

                let addNewObj = action.payload
                addNewObj['counter'] = action.payload.counter
                addNewObj['priceOfProdut'] = addNewObj.price * addNewObj.counter


                newCart = [
                    ...newCart,
                    addNewObj
                ];
            }


            totalCounter += action.payload.counter

            totalPrice += +action.payload.price * action.payload.counter



            return {
                ...state,
                cart: newCart,
                totalCounter,
                totalPrice

            }

        case types.FILTER_CART:
            const cartFilter = state.cart.filter(item => item.counter > 0)
            console.log("FILTER CARD =====>>>>", cartFilter);

            return {
                ...state,
                cart: cartFilter
            }

        case types.REMOVE_CART:
            const itemId = action.payload.id

            const counterRemoved = action.payload.counter
            const priceRemoved = action.payload.priceOfProdut

            const cartAfterRemoved = state.cart.filter(item => item.id !== itemId)

            // console.log("remove ====", cartRemoved);

            return {
                ...state,
                cart: [...cartAfterRemoved],
                totalCounter: state.totalCounter - counterRemoved,
                totalPrice: state.totalPrice - priceRemoved
            }




        default:
            return state;
    }
};

export default shoppingCart;
