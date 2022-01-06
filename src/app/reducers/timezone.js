const initialUserState = {
  localTimezone: false,
};

const timezoneReducer = (state = initialUserState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case "TOGGLE_LOCAL_TIMEZONE":
      return {
        ...state,
        localTimezone: !state.localTimezone,
      };
    default:
      break;
  }

  return newState;
};

export default timezoneReducer;
