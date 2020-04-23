import React from "react";
import { Route } from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/collections-overview";
import CollectionPage from "../collection/collection.component";

//The component getting access to "match" property via
//its parent which is "Routing" to it, aka, rendering it,
//within a <Route/> component

//prettier-ignore
const ShopPage = (props) => 
{
  console.log(props.match.path);
  return(
  <div className="shop-page">
    <Route
    exact path={`${props.match.path}`}
    component={CollectionsOverview}
    />
    <Route path={`${props.match.path}/:collectionId`} component={CollectionPage}/>
  </div>
)};

//<Route path={`${props.match}/:categoryId`}/>
//We want that the shop page will be able to route to
//category pages regardless of it's current path, to make
//the component more reusable. if we hardcoded '/shop/:categoryId' we
//would require everyone using this component to render this component
//at /shop route, otherwise it wouldn't be able to render from it to category
//pages.

//:categoryId will be a prop to the component we will route for, from this component.

export default ShopPage;
