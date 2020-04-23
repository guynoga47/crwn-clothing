import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollection = (collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  );

//here we return the collections data as an array so we wont break the code in collectionOverview that applies array functions to
//display the items correctly
export const selectCollectionsForOverview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
);
/*

The code below no longer relevant as our collection selector since we optimized the code and moved the SHOP_DATA (collections) 
to an object data structure instead of an array, so we will get O(1) access based on CollectionUrlParam as key 
instead of searching each time using find.

export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections.find(
      (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    )
  );
*/
