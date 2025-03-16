import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface CountriesData {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
}

type CommonName = Pick<CountriesData['name'], 'common'>['common'];

interface CountriesState {
  countries: CommonName[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: null | string;
}

const initialState: CountriesState = {
  countries: [],
  loading: 'idle',
  error: null,
};

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = (await response.json()) as CountriesData[];
    return data.map((country) => country.name.common);
  }
);

const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message as string;
      });
  },
  selectors: {
    selectCountries: ({ countries }) => countries,
    selectCountriesLoading: ({ loading }) => loading,
  },
});

export const { selectCountries, selectCountriesLoading } =
  countrySlice.selectors;
export default countrySlice.reducer;
