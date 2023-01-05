import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { getDictionaryInfo } from '@src/configs/fetch-apis';

const initDictionary: {
  data: DictionaryState | null,
  errMsg: string | null,
  isLoading: boolean
} = {
  data: null,
  errMsg: null,
  isLoading: false,
};

interface DictionaryState {
  [key: string]: {
    [key: number]: string
  }
}

export const getDictionary = createAsyncThunk('dictionary/fetch', async () => {
  const response = await getDictionaryInfo();
  const result: DictionaryState = {};
  (response || []).forEach(item => {
    const element: {[key: string]: string} = {};
    element[item.dict_value] = item.dict_label;
    result[item.dict_type] = Object.assign({}, result[item.dict_type], element);
  });
  return result;
});

export const getDictionarySlice = createSlice({
  name: 'dictionary',
  initialState: initDictionary,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDictionary.pending, state => {
        state.isLoading = true;
      })
      .addCase(getDictionary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getDictionary.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const dictionarySelector = (state: RootState) => state.dictionary.data;
 
export default getDictionarySlice.reducer;
