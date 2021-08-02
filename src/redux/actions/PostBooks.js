import API from "../../Utils/API";
import BooksApiCall from "./GetBooks";
export const postBook =
  ({ name, slug, author, noOfPages, category }) =>
  async (dispatch, getState) => {
    const token = getState().auth.tokenKey;
    const body = JSON.stringify({
      name,
      slug,
      noOfPages,
      author,
      category,
    });

    console.log(body);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await API.post("/books", body, config);
      BooksApiCall();

      return { status: response.status };
    } catch (error) {
      console.log(error.message);
      return { status: error.message };
    }
  };

export default postBook;
