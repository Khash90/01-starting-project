import { useContext } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

import classes from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {

  const cartCtx =  useContext(CartContext);

  // reduce allows us to transform an array of data into a single value.
  //first value a function which will be called for you , second value is a starting value.
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);


  return <button className={classes.button} onClick={props.onClick}>
    <span className={classes.icon}>
        <CartIcon />
    </span>
    <span>
        Your Cart
    </span>
    <span className={classes.badge}>
        {numberOfCartItems}
    </span>
  </button>
}

export default HeaderCartButton