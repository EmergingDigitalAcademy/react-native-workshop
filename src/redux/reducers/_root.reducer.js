import { combineReducers } from "redux";

// system reducers

// secureStoreCredentials

const secureStoreCredentials = (
  state = { username: null, email: null },
  action
) => {
  switch (action.type) {
    case "SET_SECURE_STORE_CREDENTIALS":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  secureStoreCredentials,
});
