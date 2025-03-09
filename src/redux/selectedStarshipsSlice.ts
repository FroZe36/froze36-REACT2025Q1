import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StarshipShortProperties } from '../types/types';

const initialState: StarshipShortProperties[] = [];

const selectedStarshipsSlice = createSlice({
  name: 'selectedStarships',
  initialState,
  reducers: {
    addStarship: (state, action: PayloadAction<StarshipShortProperties>) => {
      const existingStarship = state.find(
        (starship) => starship.name === action.payload.name
      );
      if (!existingStarship) {
        state.push(action.payload);
      }
    },
    removeStarship: (state, action: PayloadAction<string>) => {
      return state.filter((starship) => starship.name !== action.payload);
    },
    removeAllStarships: () => [],
  },

  selectors: {
    selectAllStarships: (selectedStarships) => selectedStarships,
    selectStarshipByName: (selectedStarships, name: string) =>
      selectedStarships.find((starship) => starship.name === name),
    selectTotalStarships: (selectedStarships) => selectedStarships.length,
  },
});

export const {
  selectAllStarships,
  selectStarshipByName,
  selectTotalStarships,
} = selectedStarshipsSlice.selectors;

export const { addStarship, removeAllStarships, removeStarship } =
  selectedStarshipsSlice.actions;

export default selectedStarshipsSlice.reducer;
