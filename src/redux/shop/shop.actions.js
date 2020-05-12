import ShopActionTypes from "./shop.types";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
  //No need for payload because we only change the state isFetching to true,
  //meaning this action doesn't contain a payload in it.
  //from the component perspective it means we don't need to pass any additional data
  //but the action itself in MapDispatchToProps and in the action invocation.
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (error) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: error,
});

export const fetchCollectionsStartAsync = () => {
  return;
};

/*   reminder:
     dispatch triggers an action on the reducer based on the action the reducer is getting
     *

/*   onSnapShot:
      whenever this collection gets updated, or this code runs for first time,
      this onSnapShot will send us the code of our collections objects array 
      at the time when this code renders. 
      
      We implemented it in the Observable pattern, but could also use simple
      promises pattern by doing:
      collectionRef.get().then(snapshot => {....})
      
      Update: moved to get() in order to stick with the videos.
      Update: Copied this code from shop.component to shop.actions so we will 
      be able to utilize this code from more components.
      */
