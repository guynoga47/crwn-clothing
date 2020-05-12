import { connect } from "react-redux";
//import { compose } from "redux";
import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selector";
import withSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "./collection.component";

const mapStateToProps = (state) => ({
  isLoading: !selectIsCollectionsLoaded(state),
});

const CollectionPageContainer = connect(mapStateToProps)(
  withSpinner(CollectionPage)
);

export default CollectionPageContainer;

/*
Containers doesn't render anything, just pass props to components.
*/
