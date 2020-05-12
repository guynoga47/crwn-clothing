import React from "react";
import "./collection.styles.scss";
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selector";
import CollectionItem from "../../components/collection-item/collection-item.component";

const CollectionPage = (props) => {
  console.log("Collection page props: ", props);
  return (
    <div className="collection-page">
      <h2 className="title">{props.collection.title}</h2>
      <div className="items">
        {props.collection.items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

/*
selectCollection returns a function that needs collectionId as a parameter, 
because that's how we defined it.
based on that parameter we get the relevant collection object from the shop data.
*/

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
