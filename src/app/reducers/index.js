import favoritesReducer from "./favorites";
import timezoneReducer from "./timezone";
import searchReducer from "./search";
import { combineReducers } from "redux";

// The key of this object will be the name of the store
const rootReducers = combineReducers({
  favorites: favoritesReducer,
  timezone: timezoneReducer,
  searches: searchReducer,
});

export default rootReducers;
