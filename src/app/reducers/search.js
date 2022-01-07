const initialUserState = {
  searchShows: [],
};

const favoritesReducer = (state = initialUserState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case "SEARCH_SHOWS":
      if (state.searchShows.length > 9) state.searchShows.shift(); // Remove oldest result
      return {
        ...state,
        searchShows: [
          ...state.searchShows,
          {
            searchKeyword: action.payload.searchKeyword,
            searchResults: action.payload.searchResults,
            timestamp: action.payload.timestamp,
          },
        ],
      };
    default:
      break;
  }
  return newState;
};

export default favoritesReducer;
