import React from "react";
import { connect } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";
//prettier-ignore
import {selectCartItems,selectCartTotal} from "../../redux/cart/cart.selectors";
//prettier
import "./checkout.styles.scss";

const CheckoutPage = (props) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>Product</span>
      </div>
      <div className="header-block">
        <span>Description</span>
      </div>
      <div className="header-block">
        <span>Quantity</span>
      </div>
      <div className="header-block">
        <span>Price</span>
      </div>
      <div className="header-block">
        <span>Remove</span>
      </div>
    </div>
    {props.cartItems.map((cartItem) => (
      <CheckoutItem cartItem={cartItem} />
    ))}
    <div className="total">TOTAL: {props.total}</div>
    <div className="test-warning">
      *Please use the following test credit card for payments*
      <br />
      4242 4242 4242 4242 - Exp: 01/21 CVV: 123
    </div>

    <StripeCheckoutButton price={props.total} />
  </div>
);

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
  total: selectCartTotal(state),
});

export default connect(mapStateToProps)(CheckoutPage);
