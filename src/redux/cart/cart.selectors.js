import { createSelector } from "reselect";

export const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulator, cartItem) => accumulator + cartItem.price * cartItem.quantity,
    0
  )
);
//prettier

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulator, cartItem) => accumulator + cartItem.quantity,
      0
    )
);

/*
another method of doing the same thing, 
but now omitting the first createSelector that only gets
the state.cart.cartItems.

export const selectCartItems = (state) => state.cart.cartItems;

export const selectCartItemsCount = createSelector(
  [selectCartItems2],
  (cartItems) =>
    cartItems.reduce(
      (accumulator, cartItem) => accumulator + cartItem.quantity,
      0
    )
);

in the call to the selector from mapStateToProps in the
appropriate component, we should pass state. now the state
will bubble up through the selectors untill it gets a value
to work upon. in the implemented solution, we bubble up the state 
from selectCartItemsCount, to selectCartItems, to selectCart which finally
gets the state and returns a value to selectCartItems based on state, which
can then return a value to selectCartItemsCount.
*/
