import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDictionaryInfo } from '@src/configs/fetch-apis';

const initDictionary = {
  data: null,
  errMsg: null,
  isLoading: false,
};

export const getDictionary = createAsyncThunk('dictionary/fetch', async () => {
  const response = await getDictionaryInfo();
  const result = {};
  (response || []).forEach(item => {
    const element = {};
    element[item.dict_value] = item.dict_label;
    result[item.dict_type] = Object.assign({}, result[item.dict_type], element);
  });
  return result;
});

export const getDictionarySlice = createSlice({
  name: 'dictionary',
  initialState: initDictionary,
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

export const dictionarySelector = state => state['dictionary'].data;

export default getDictionarySlice.reducer;
