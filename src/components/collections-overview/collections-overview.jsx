import React from "react";
import { connect } from "react-redux";
import CollectionPreview from "../collection-preview/collection-preview.component";
import { selectCollectionsForOverview } from "../../redux/shop/shop.selector";

import "./collections-overview.styles.scss";

const CollectionsOverview = (props) => {
  console.log("collectionsOverview: ", props.collections);
  return (
    <div className="collections-overview">
      {props.collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  collections: selectCollectionsForOverview(state),
});

export default connect(mapStateToProps)(CollectionsOverview);
