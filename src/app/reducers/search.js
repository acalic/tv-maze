const initialUserState = {
  globalSearch: [
    {
      searchKeyword: [],
      searchResult: [],
    },
  ],
};

const favoritesReducer = (state = initialUserState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case "GLOBAL_SEARCH":
      //let payload = Object.assign({}, action.payload);
      let currentSearchKeyword = action.payload;

      // TODO fetch api call...
      let currentSearchResult = "prazno...";
      console.log(action.payload);

      return {
        ...state,
        globalSearch: [
          ...state.globalSearch,
          {
            searchKeyword: [{ ...state.searchKeyword, currentSearchKeyword }],
            searchResult: [{ ...state.searchResult, currentSearchResult }],
          },
        ],
      };
      break;
    default:
      break;
  }

  // return the modified state
  return newState;
};

export default favoritesReducer;
