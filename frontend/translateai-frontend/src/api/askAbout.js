import { instance as axiosInstance } from "./apiInterceptor";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPhiResponse = createAsyncThunk(
  "phi/fetchPhiResponse",
  async ({ sourceText, question }, { getState }) => {
    const token = getState().auth.value.token;

    const response = await axiosInstance.post(
      "/ask-about",
      {
        text: sourceText,
        question: question,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.answer; // the API response contains an "answer" field
  }
);

const phiSlice = createSlice({
  name: "phi",
  initialState: {
    answer: "",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhiResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.answer = "";
      })
      .addCase(fetchPhiResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.answer = action.payload;
      })
      .addCase(fetchPhiResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default phiSlice.reducer;
