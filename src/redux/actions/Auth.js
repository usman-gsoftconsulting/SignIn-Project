import API from "../../Utils/API";

// signup api action

export const signup =
  ({ username, password, email }) =>
  async (dispatch) => {
    // set body
    const body = JSON.stringify({
      email,
      username,
      password,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const response = await API.post(`/auth/local/register`, body, config);

      return { status: response?.status };
    } catch (error) {
      console.log(error.message);
      return { status: error.response?.status, error: error.message };
    }
  };

// signin api action

export const signin =
  ({ email, password }) =>
  async (dispatch) => {
    // set body
    const body = JSON.stringify({
      identifier: email,
      password,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const response = await API.post(`auth/local`, body, config);
      console.log("from try");
      localStorage.setItem("key", response.data.jwt);
      localStorage.setItem("isAuthenticated", true);
      dispatch({
        type: "USER_SIGNIN",
        payload: {
          email: response.data.user.email,
          key: response.data.jwt,
          status: response.status,
        },
      });
      return { status: response.status };
    } catch (error) {
      console.log("from catch");
      console.log(error.message);
      return { status: error.response?.status, error: error.message };
    }
  };
