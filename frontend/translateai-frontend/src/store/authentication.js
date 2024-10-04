import { createSlice } from "@reduxjs/toolkit";
import { resetTranslation } from "./translation";

const initialState = {
  value: {
    token: null,
    user: {
      userId: null,
      username: null,
    },
    isLoggedIn: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.user.userId = action.payload.user.id;
      state.value.user.username = action.payload.user.username;
      state.value.isLoggedIn = true;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.user.userId = null;
      state.value.user.username = null;
      state.value.isLoggedIn = false;
    },
  },
});

export const logout = () => (dispatch) => {
  dispatch(resetTranslation());
  dispatch(authSlice.actions.logout());
};

export const { login } = authSlice.actions;
export default authSlice.reducer;
