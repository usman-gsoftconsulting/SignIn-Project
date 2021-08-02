import API from "../../Utils/API";
import BooksApiCall from "./GetBooks";
export const deleteBook = (id) => async (dispatch, getState) => {
  const token = getState().auth.tokenKey;
  const booksId = id;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await API.delete(`/books/${booksId}`, config);
    console.log(response);
    BooksApiCall();

    return { status: response.status };
  } catch (error) {
    return { status: error.message };
  }
};

export default deleteBook;
