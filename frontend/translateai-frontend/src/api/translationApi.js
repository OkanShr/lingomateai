import { instance as axiosInstance } from "./apiInterceptor";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTranslation = createAsyncThunk(
  "translation/fetchTranslation",
  async ({ sourceText, sourceLang, targetLang }, { getState }) => {
    const token = getState().auth.value.token;

    const response = await axiosInstance.post(
      "/translate",
      {
        text: sourceText,
        source_lang: sourceLang,
        target_lang: targetLang,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.translated_text;
  }
);

const translationSlice = createSlice({
  name: "translation",
  initialState: {
    translatedText: "",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTranslation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.translatedText = "";
      })
      .addCase(fetchTranslation.fulfilled, (state, action) => {
        state.loading = false;
        state.translatedText = action.payload;
      })
      .addCase(fetchTranslation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default translationSlice.reducer;
