
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { email:null, password:null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.name = action.payload.name;
      state.value.password = action.payload.password;
    },
}
})

export const {login} = userSlice.actions;
export default userSlice.reducer;