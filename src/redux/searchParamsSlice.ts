import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchParam: string;
  pageNum: number;
}

const initialState: SearchState = {
  searchParam: '',
  pageNum: 1,
};

const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {
    setSearchParam: (state, action: PayloadAction<string>) => {
      state.searchParam = action.payload;
    },
    setPageNum: (state, action: PayloadAction<number>) => {
      state.pageNum = action.payload;
    },
  },
  selectors: {
    selectSearchParam: (searchParams) => searchParams.searchParam,
    selectPageNum: (searchParams) => searchParams.pageNum,
  },
});

export const { setSearchParam } = searchParamsSlice.actions;
export const { selectSearchParam } = searchParamsSlice.selectors;
export default searchParamsSlice.reducer;
