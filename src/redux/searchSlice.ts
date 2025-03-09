import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchParam: string;
  pageNum: number;
}

const initialState: SearchState = {
  searchParam: '',
  pageNum: 1,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParam: (state, action: PayloadAction<string>) => {
      state.searchParam = action.payload;
    },
    setPageNum: (state, action: PayloadAction<number>) => {
      state.pageNum = action.payload;
    },
  },
});

export const { setSearchParam, setPageNum } = searchSlice.actions;
export default searchSlice.reducer;
