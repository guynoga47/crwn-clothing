import React from "react";
import { connect } from "react-redux";
import {
  clearItemFromCart,
  removeItem,
  addItem,
} from "../../redux/cart/cart.action";
import "./checkout-item.styles.scss";
import { selectCartItems } from "../../redux/cart/cart.selectors";

const CheckoutItem = (props) => (
  <div className="checkout-item">
    <div className="image-container">
      <img src={props.cartItem.imageUrl} alt="item" />
    </div>
    <span className="name">{props.cartItem.name}</span>
    <span className="quantity">
      <div className="arrow" onClick={() => props.onRemoveItem(props.cartItem)}>
        &#10094;
      </div>
      <span className="value">{props.cartItem.quantity}</span>
      <div className="arrow" onClick={() => props.onAddItem(props.cartItem)}>
        &#10095;
      </div>
    </span>
    <span className="price">{props.cartItem.price}</span>
    <div
      className="remove-button"
      onClick={() => props.onClearFromCartButtonClick(props.cartItem)}
    >
      &#10005;
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  onClearFromCartButtonClick: (cartItem) =>
    dispatch(clearItemFromCart(cartItem)),
  onRemoveItem: (cartItem) => dispatch(removeItem(cartItem)),
  onAddItem: (cartItem) => dispatch(addItem(cartItem)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
