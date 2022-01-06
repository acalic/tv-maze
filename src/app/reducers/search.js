const initialUserState = {
  searchShows: [
    {
      searchKeyword: "",
      searchResults: [],
    },
  ],
};

const favoritesReducer = (state = initialUserState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case "SEARCH_SHOWS":
      return {
        ...state,
        searchShows: [
          ...state.searchShows,
          {
            searchKeyword: action.payload.searchKeyword,
            searchResults: action.payload.searchResults,
          },
        ],
      };
    default:
      break;
  }
  return newState;
};

export default favoritesReducer;
