import { useReducer } from "react";

import CartContext from "./cart-context";


const defaultCartState = {
  items: [],
  totalAmount: 0
}

// the action is dispatched by you later in your code
// the state is simply the last  state snapshot of the state managed by the reducer.
// concat adds a new item to an array but unlike push, it doesnt edit the existing array, but return a new array.

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedItems = state.items.concat(action.item); //return a new array 

    //total amount that needs to be changed.
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {

      dispatchCartAction({
        type: 'ADD',
        item: item
      });
    }

    const removeItemFromCartHandler = (id) => {
      dispatchCartAction({
        type: 'REMOVE',
        id: id
      });
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

  return <CartContext.Provider value={cartContext}>
    {props.children}
    </CartContext.Provider>;
};

export default CartProvider;
