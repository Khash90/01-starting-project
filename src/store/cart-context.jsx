import React from 'react'

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  
  // functions to update our context
  addItem: (item) => {},
  removeItem: (id) => {}
})


export default CartContext;