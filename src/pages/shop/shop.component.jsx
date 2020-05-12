import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import CollectionPageContainer from "../collection/collection-container";
import CollectionOverviewContainer from "../../components/collections-overview/collection-overview.container";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

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

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;
  componentDidMount() {
    this.props.onFetchCollectionsStart();
  }
  render() {
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${this.props.match.path}`}
          component={CollectionOverviewContainer}
        />
        <Route
          path={`${this.props.match.path}/:collectionId`}
          component={CollectionPageContainer}
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
  onFetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);

/*
Explanation of why do we need IsCollectionLoaded selector only in CollectionPageWithSpinner
Component:

Our rendering on CollectionPageWithSpinner is based on a specific collection we select from collections,
and we are assuming that once we are trying to get a specific collection, then the collections were already
fetched and exists. When we first try to render shop/jackets for example (a CollectionPage) we are rendering
the component with the isLoading is set to false (because was based on isFetching state prop, and isFetching
initial prop is false, and we render is before componentDidMount and obviously before fetch finished and isFetching
was set to true) hence we are trying to access (using selector) a key of collections, when collections wan't fetched
yet. So we don't render a spinner and we try to render the original component with no data to relate to.

In contrast to CollectionsOverviewWithSpinner, which is too gets render with isLoading=false, because we didn't modify
it's selector 
*/
