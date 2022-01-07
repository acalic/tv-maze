import { toast } from "react-toastify";
import { apiUrl } from "@utils/globals";

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

export const searchShows = (payload) => {
  return async (dispatch) => {
    fetch(`${apiUrl}/search/shows?q=${payload}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          let shows = data.map((item) => item.show); // Extract shows from result
          let timestamp = new Date();
          timestamp.toUTCString();

          dispatch({
            type: "SEARCH_SHOWS",
            payload: {
              searchKeyword: payload,
              searchResults: shows,
              timestamp: timestamp,
            },
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
};
