import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { connect } from "react-redux";

import CartIcon from "../cart-icon/cart-icon.component";
import "./header.styles.scss";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signOutStart, signOutSuccess } from "../../redux/user/user.actions";

const Header = (props) => (
  <div className="header">
    <Link to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/contact">
        CONTACT
      </Link>
      {props.currentUser ? (
        <div className="option" onClick={props.onSignOutStart}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {props.hidden ? null : <CartDropdown />}
  </div>
);

const mapStateToPros = (state) => ({
  currentUser: selectCurrentUser(state),
  hidden: selectCartHidden(state),
});

const mapDispatchToPros = (dispatch) => ({
  onSignOutStart: () => dispatch(signOutStart()),
});

/* another way of doing it (less readable):
const mapStateToPros = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});
 */

/* 
another way of doing it:

const mapStateToPros = ({user: {currentUser}, cart: {hidden}}) => ({
  currentUser,
  hidden
});  */

export default connect(mapStateToPros, mapDispatchToPros)(Header);
