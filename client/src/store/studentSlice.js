import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:5000/students';

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (page = 1) => {
    const res = await axios.get(`${API}?page=${page}&limit=3`);
    return res.data;
  }
);



const studentSlice = createSlice({
  name: 'students',
  initialState: {
    data: [],
    total: 0,
    page: 1,
    loading: false
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchStudents.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { setPage } = studentSlice.actions;
export default studentSlice.reducer;
