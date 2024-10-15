import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  translatedText: "",
  loading: false,
  error: null,
};

const translationSlice = createSlice({
  name: "translation",
  initialState,
  reducers: {
    setTranslation: (state, action) => {
      state.translatedText = action.payload;
      state.loading = false;
      state.error = null;
    },
    startTranslation: (state) => {
      state.loading = true;
    },
    translationError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetTranslation: () => initialState,
  },
});

export const {
  setTranslation,
  startTranslation,
  translationError,
  resetTranslation,
} = translationSlice.actions;
export default translationSlice.reducer;
