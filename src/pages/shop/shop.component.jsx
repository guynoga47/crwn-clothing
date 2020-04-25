import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import CollectionsOverview from "../../components/collections-overview/collections-overview";
import CollectionPage from "../collection/collection.component";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/shop/shop.actions";

/* The component getting access to "match" property via
its parent which is "Routing" to it, aka, rendering it,
within a <Route/> component */

/* 
Explanation of WithSpinnner HOC:

When we call this HOC we get back a SpinnerOrWrappedComponent that takes any props
but destructures the isLoading and ...otherProps properties of it.
So CollectionsOverviewWithSpinner or CollectionPageWithSpinner are just standard component is isLoading is false,
or we render the spinner if isLoading is true.

Meaning we returned a component with "enhanced" functionality layer over our original component,
because we needed that extra functionality to know how to deal with rendering something on the UI, before we finished
the async shop data fetching from firestore.
*/

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;
  componentDidMount() {
    const collectionRef = firestore.collection("collections");
    /*   onSnapShot:
     whenever this collection gets updated, or this code runs for first time,
     this onSnapShot will send us the code of our collections objects array 
     at the time when this code renders. 
     
     We implemented it in the Observable pattern, but could also use simple
     promises pattern by doing:
     collectionRef.get().then(snapshot => {....})
     
     Update: moved to get() in order to stick with the videos.
     */

    collectionRef.get().then((snapshot) => {
      const collectionMap = convertCollectionsSnapshotToMap(snapshot);
      console.log("collectionMap before dispatch", collectionMap);
      this.props.onUpdateCollections(collectionMap);
      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${this.props.match.path}`}
          render={(props) => (
            <CollectionsOverviewWithSpinner
              isLoading={this.state.loading}
              {...props}
            />
          )}
        />
        <Route
          path={`${this.props.match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner
              isLoading={this.state.loading}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
/* 
<Route path={`${props.match}/:categoryId`}/>
We want that the shop page will be able to route to
category pages regardless of it's current path, to make
the component more reusable. if we hardcoded '/shop/:categoryId' we
would require everyone using this component to render this component
at /shop route, otherwise it wouldn't be able to render from it to category
pages.

:categoryId will be a prop to the component we will route for, from this component.
 */

const mapDispatchToProps = (dispatch) => ({
  onUpdateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
