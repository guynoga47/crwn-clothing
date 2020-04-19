import React from "react";
import "./collection-item.styles.scss";
import { addItem } from "../cart/cart.action";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";

//prettier-ignore
const CollectionItem = ({item, onAddItem}) => (
  <div className="collection-item">
    {console.log(item, item.imageUrl, item.price)}
    <div className="image" style={{ backgroundImage: `url(${item.imageUrl})` }} />
    <div className="collection-footer">
      <span className="name">{item.name}</span>
      <span className="price">{item.price}</span>
    </div>
    <CustomButton onClick={()=>onAddItem(item)} inverted>
      {" "}
      Add to cart{" "}
    </CustomButton>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  onAddItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
