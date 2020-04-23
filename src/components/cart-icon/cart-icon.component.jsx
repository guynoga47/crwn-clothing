import React from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.action";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

const CartIcon = (props) => (
  <div className="cart-icon" onClick={props.onToggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{props.itemCount}</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  onToggleCartHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = (state) => ({
  itemCount: selectCartItemsCount(state),
});

/*
mapStateToProps gets called for each connected component and
every time there is a state change (global state), and then evaluates
if it should update the props it sends the component, 
based on the new state. the problem was that when we used reduce method,
to get the itemCount from state.cart.cartItems, without using reselect memoization,
the function invoked every time mapStateToProps got called, meaning after EVERY state
change, and then RETURNED A NEW OBJECT that regardless of the values within the cartItems array,
interpreted as a different object from the object before and triggered a unneccesary rerendering. 
 */

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
