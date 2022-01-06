const initialUserState = {
  favorites: [],
};

const favoritesReducer = (state = initialUserState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    /* case "TOGGLE_FAVORITE_SHOW":
      if (state.favorites.some((e) => e.name === action.payload.name)) {
        let filteredList = state.favorites.filter(
          (e) => e.name !== action.payload.name
        );
        return {
          ...state,
          favorites: [...filteredList],
        };
      } else {
        let payload = Object.assign({}, action.payload);

        return {
          ...state,
          favorites: [...state.favorites, payload],
        };
      } */
    case "ADD_FAVORITE_SHOW":
      let payload = Object.assign({}, action.payload);
      return {
        ...state,
        favorites: [...state.favorites, payload],
      };
    case "REMOVE_FAVORITE_SHOW":
      if (state.favorites.some((e) => e.name === action.payload.name)) {
        let filteredList = state.favorites.filter(
          (e) => e.name !== action.payload.name
        );
        return {
          ...state,
          favorites: [...filteredList],
        };
      }
      break;
    default:
      break;
  }

  // return the modified state
  return newState;
};

export default favoritesReducer;
