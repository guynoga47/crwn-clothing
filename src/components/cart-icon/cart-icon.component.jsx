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

const mapStateToPros = (state) => ({
  itemCount: selectCartItemsCount(state),
});

export default connect(mapStateToPros, mapDispatchToProps)(CartIcon);
