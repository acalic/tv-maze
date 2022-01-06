import { toast } from "react-toastify";
import { apiUrl } from "@utils/globals";

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

/* export const searchShows = (payload) => {
  return function (dispatch) {
    dispatch({
      type: "SEARCH_SHOWS",
      payload,
    });
  };
}; */

export const searchShows = (payload) => {
  try {
    return async (dispatch) => {
      const result = await fetch(`${apiUrl}/search/shows?q=${payload}`);
      const json = await result.json();
      if (json) {
        dispatch({
          type: "SEARCH_SHOWS",
          payload: {
            searchKeyword: payload,
            searchResults: json,
          },
        });
      } else {
        console.log("Unable to fetch!");
      }
    };
  } catch (error) {
    console.log(error);
  }
};
