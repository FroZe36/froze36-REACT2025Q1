import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModifiedFormSchemaPicture } from '../lib/types';

const initialState: ModifiedFormSchemaPicture[] = [];

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<ModifiedFormSchemaPicture>) => {
      state.push(action.payload);
    },
  },
  selectors: {
    selectAllForms: (forms) => forms,
  },
});

export const { addForm } = formsSlice.actions;
export const { selectAllForms } = formsSlice.selectors;

export default formsSlice.reducer;
