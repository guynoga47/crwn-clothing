import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

const WithSpinner = (WrappedComponent) => {
  const SpinnerOrWrappedComponent = ({ isLoading, ...otherProps }) => {
    console.log("isLoading inside SpinnerOrWrappedComponent", isLoading);
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return SpinnerOrWrappedComponent;
};
export default WithSpinner;

/* 
Explanation of WithSpinnner HOC:

When we call this HOC we get back a SpinnerOrWrappedComponent that takes any props
but destructures the isLoading and ...otherProps properties of it.
So CollectionsOverviewWithSpinner or CollectionPageWithSpinner are just standard component is isLoading is false,
or we render the spinner if isLoading is true.

Meaning we returned a component with "enhanced" functionality layer over our original component,
because we needed that extra functionality to know how to deal with rendering something on the UI, before we finished
the async shop data fetching from firestore.

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

*/
