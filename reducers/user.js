import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { email:null, name:null, breed:null, age:null, gender: null, vaccins: false,
  aboutMe: null, aboutMyOwner: null, images: [], token: null },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.name = action.payload.name;
      state.value.email = action.payload.email;
      state.value.token = action.payload.token;
    },
    updateProfil: (state, action) => {
      state.value.name = action.payload.name;
      state.value.breed = action.payload.breed;
      state.value.age = action.payload.age;
      state.value.gender = action.payload.gender;
      state.value.vaccins = action.payload.vaccins;
      state.value.aboutMe = action.payload.aboutMe;
      state.value.aboutMyOwner = action.payload.aboutMyOwner;
      state.value.images.push(action.payload.images);
    },
    addPhoto: (state, action) => {
      state.value.images.push(action.payload);
     // console.log(state.value.images);
    },
    addRoom: (state, action) => {
      console.log("action",action.payload);
      state.value.room = action.payload;
    },
    addOtherUserName: (state, action) => {
      console.log("action",action.payload);
      state.value.otherusername = action.payload;
    },
    deleteRoom: (state) => {
      state.value.room = null
    }
}
})

export const { login, updateProfil, addPhoto, addRoom, addOtherUserName, deleteRoom } = userSlice.actions;
export default userSlice.reducer;