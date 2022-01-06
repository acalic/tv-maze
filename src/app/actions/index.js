import { toast } from "react-toastify";

/* export const toggleFavorite = (payload) => {
  return function (dispatch) {
    dispatch({
      type: "TOGGLE_FAVORITE_SHOW",
      payload,
    });
  };
}; */

export const addFavorite = (payload) => {
  return function (dispatch) {
    dispatch({
      type: "ADD_FAVORITE_SHOW",
      payload,
    });
    toast.success(`"${payload.name}" added to favorites`);
  };
};

export const globalSearch = (payload) => {
  return function (dispatch) {
    dispatch({
      type: "GLOBAL_SEARCH",
      payload,
    });
    //console.log(payload);
    //toast.success("Timezone changed");
  };
};

export const removeFavorite = (payload) => {
  return function (dispatch) {
    dispatch({
      type: "REMOVE_FAVORITE_SHOW",
      payload,
    });
    toast.success(`"${payload.name}" removed from favorites`);
  };
};

export const toggleLocalTimezone = () => {
  return function (dispatch) {
    dispatch({
      type: "TOGGLE_LOCAL_TIMEZONE",
    });
    toast.success("Timezone changed");
  };
};
