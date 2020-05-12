import { connect } from "react-redux";
//import { compose } from "redux";
import { selectIsFetchingCollections } from "../../redux/shop/shop.selector";
import withSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from "./collections-overview";

const mapStateToProps = (state) => ({
  isLoading: selectIsFetchingCollections(state),
});

const CollectionsOverviewContainer = connect(mapStateToProps)(
  withSpinner(CollectionsOverview)
);

export default CollectionsOverviewContainer;
/*
We added another layer of "enhancement" to our withSpinner enhanced CollectionsOverview
Meaning the withSpinner(CollectionsOverview) is now wrapped in connect of react-redux, that
is also mapping isLoading property (which withSpinner needs with this name exactly), based on the
current redux state. 

so using this component will always result in a withSpinner enhanced CollectionOverview componnet,
which also "automaticly" accesses isFetching prop in state, and gets it in it's isLoading property.
meaning the HOC we export always "knows" based on state, if it should render the spinner or the component
itself.

so now we don't need to feed the isLoading property through shop page to our CollectionOverview,
we just render this component instead.

another way of doing the same thing: using compose function of redux.

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview)
 */
