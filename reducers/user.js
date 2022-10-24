import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { email:null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.email = action.payload.email;
    },
}
})

export const { login } = userSlice.actions;
export default userSlice.reducer;