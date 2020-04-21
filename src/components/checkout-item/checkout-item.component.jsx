import React from "react";
import "./checkout-item.styles.scss";

const CheckoutItem = (props) => (
  <div className="checkout-item">
    <div className="image-container">
      <img src={props.cartItem.imageUrl} alt="item" />
    </div>
    <span className="name">{props.cartItem.name}</span>
    <span className="quantity">{props.cartItem.quantity}</span>
    <span className="price">{props.cartItem.price}</span>
    <div className="remove-button">&#10005;</div>
  </div>
);

export default CheckoutItem;
