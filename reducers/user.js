import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { email:null, name:null, breed:null, age:0, gender: null, vaccins: false,
  aboutMe: null, aboutMyOwner: null, token: null },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.email = action.payload.email;
      state.value.token = action.payload.token;
      state.value.name = action.payload.name;
    },
    updateProfil: (state, action) => {
      state.value.name = action.payload.name;
      state.value.breed = action.payload.breed;
      state.value.age = action.payload.age;
      state.value.gender = action.payload.gender;
      state.value.vaccins = action.payload.vaccins;
      state.value.aboutMe = action.payload.aboutMe;
      state.value.aboutMyOwner = action.payload.aboutMyOwner;
    }
    
}
})

export const { login, updateProfil } = userSlice.actions;
export default userSlice.reducer;
