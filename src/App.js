import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "../src/pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "../src/pages/checkout/checkout.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";
class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          console.log(`snapShot.data() on App.js:,`, snapShot.data());
          this.props.onSetCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        //added else, and corrected an error in the videos.
        //otherwise setCurrentUser is fired twice, once with payload null (this section), and then after async task is completed and we actually have
        //a payload (onSnapShot);
        //the setCurrentUser action should onnly happen once.
        this.props.onSetCurrentUser(null);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    console.log(
      "state when unmounting, after this.unsubscribeFromAuth(): ",
      this.props.currentUser
    );
  }
  //prettier-ignore
  render() {
    console.log("rendering App component");
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" render={()=> this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />} />
          <Route path="/checkout" component={CheckoutPage}/>
        </Switch>
      </div>
    );
  }
}

/*
Removed "exact" from <Route/> to shop, since it caused trouble
when trying to implement nested routing within the shop page.
basically, when exact path is on, if we try to go to localhost:3000/shop
then we get the exact path to true, but in any other case like localhost:3000/shop/hats
we are not getting exact to true here so we are not rendering the ShopPage with the routes defined
in it at all!
*/

const mapStateToPros = (state) => ({
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSetCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToPros, mapDispatchToProps)(App);
