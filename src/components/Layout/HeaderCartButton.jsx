import { useContext, useEffect , useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

import classes from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {

  const [btnIsHighlighted,setBtnIsHighlighted] = useState(false)

  const cartCtx =  useContext(CartContext);
  const { items } = cartCtx;
  // reduce allows us to transform an array of data into a single value.
  //first value a function which will be called for you , second value is a starting value.
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
 
  //animation
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if (cartCtx.items.length === 0 ){
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    }, 300);

    //cleanup function for timer
    // returning a function in useeffect is automatically a cleanup function by React
    return () => {
      clearImmediate(timer);
    }

  }, [items])


  return <button className={btnClasses} onClick={props.onClick}>
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