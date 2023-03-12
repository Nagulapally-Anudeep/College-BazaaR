import * as api from "../api";
import { authActions } from "../store/auth";

export const signup = (formData) => async (dispatch) => {
  try {
    // signup the user
    const { data } = await api.signUp(formData);
    dispatch(
      authActions.authenticate({ data: data.result, token: data.token })
    );
  } catch (err) {
    console.log(err);
    dispatch(authActions.setError({ data: err.response.data.message }));
  }
};

export const signin = (formData) => async (dispatch) => {
  try {
    // signin the user
    const { data } = await api.signIn(formData);
    dispatch(
      authActions.authenticate({ data: data.result, token: data.token })
    );
  } catch (err) {
    console.log(err);
    dispatch(authActions.setError({ data: err.response.data.message }));
  }
};

export const googleSignIn = (formData) => async (dispatch) => {
  try {
    // google Signin user
    const { data } = await api.googleAuth(formData);
    dispatch(
      authActions.authenticate({ data: data.result, token: data.token })
    );
  } catch (err) {
    console.log(err);
  }
};
