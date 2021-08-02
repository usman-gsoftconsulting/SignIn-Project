import API from "../../Utils/API";
const booksApiCall = () => async (dispatch, getState) => {
  const token = getState().auth.tokenKey;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await API.get("/Books", config);

    dispatch({
      type: "GET_BOOKS",
      payload: response,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: "GET_BOOKS",
      payload: { errorMessage: error.message },
    });
  }
};

export default booksApiCall;
