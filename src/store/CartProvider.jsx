import { useReducer } from "react";

import CartContext from "./cart-context";


const defaultCartState = {
  items: [],
  totalAmount: 0
}

// the action is dispatched by you later in your code
// the state is simply the last  state snapshot of the state managed by the reducer.
// concat returns a new item to an array but unlike push, it doesnt edit the existing array, but return a new array.

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {

     //total amount that needs to be changed.
     const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

     //CHECK IF AN ITEM IS ALREADY PART OF THE CART
     const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);

     const existingCartItem = state.items[existingCartItemIndex];
    
     let updatedItems;


     if (existingCartItem) {
       const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
       };
       updatedItems = [...state.items];
       updatedItems[existingCartItemIndex] = updatedItem

     } else {
      
       //return a new array 
       updatedItems = state.items.concat(action.item); 
     }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  //condition for removing items , generally we  want to update the   existing item
  if (action.type === 'REMOVE') {

      //CHECK IF AN ITEM IS ALREADY PART OF THE CART
     const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);

     const existingItem = state.items[existingCartItemIndex];
     const updatedTotalAmount = state.totalAmount - existingItem.price;

     let updatedItems;
     if (existingItem.amount === 1) {

      //filter is a built-in method which returns a new array
       updatedItems = state.items.filter(item => item.id !== action.id );

     } else {
         const updatedItem = {...existingItem, amount: existingItem.amount - 1 };
         updatedItems = [...state.items];
         updatedItems[existingCartItemIndex] = updatedItem;
     }
     return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
     }
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
