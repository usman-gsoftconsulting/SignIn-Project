import { GET_BOOKS, USER_SIGNIN, LOG_OUT, USER_LOGIN_ALERT } from "../Types";

const initialState = {
  tokenKey: localStorage.getItem("key") ? localStorage.getItem("key") : "",
  username: "",
  email: "",
  loggedInUser: "",
  isAuthenticated: localStorage.getItem("isAuthenticated") ? true : false,
  userLoginAlert: false,
  loaderStatus: false,
  booksList: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN:
      return {
        ...state,
        loggedInUser: action.payload.email,
        tokenKey: action.payload.key,
        userLoginAlert: action.payload.status === 200 ? true : false,
        isAuthenticated: action.payload.status === 200 ? true : false,
      };
    case GET_BOOKS:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        booksList: action.payload?.data,
        loaderStatus: action.payload?.status === 200 ? true : false,
      };
    case LOG_OUT:
      console.log("logged out!");
      localStorage.removeItem("key");
      localStorage.removeItem("isAuthenticated");
      return {
        ...state,
        userLoginAlert: false,
        isAuthenticated: false,
        loaderStatus: false,
        booksList: [],
      };
    case USER_LOGIN_ALERT:
      return {
        ...state,
        userLoginAlert: false,
      };
    default:
      return state;
  }
};
export default reducer;
