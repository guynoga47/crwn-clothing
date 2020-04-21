import React from "react";
import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { withRouter } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cart.action";
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = (props) => {
  const checkoutButtonHandler = () => {
    props.onCheckoutButtonClick();
    props.history.push("/checkout");
  };
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {props.cartItems.length > 0 ? (
          props.cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton onClick={checkoutButtonHandler}>
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

const mapStateToPros = (state) => ({
  cartItems: selectCartItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCheckoutButtonClick: () => dispatch(toggleCartHidden()),
});
/*
refactored the code below to use a available selector instead.

const mapStateToPros = (state) => ({
  cartItems: state.cart.cartItems,
});
*/

export default withRouter(
  connect(mapStateToPros, mapDispatchToProps)(CartDropdown)
);
/*
  we want to get history, match, location props from this component
  and specifically history in order to implement a link functionality to
  our custom-button, which doesn't have it by default (and is not a Link component)
 */
