import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
  value: { email:null, name:null, breed:null, age:null, gender: null, vaccins: false,
  aboutMe: null, aboutMyOwner: null, images: [], token: null, room:[] }, // on initialise la valeur de nos états
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.name = action.payload.name;
      state.value.email = action.payload.email;
      state.value.token = action.payload.token;
    }, // fonction permettant de récupérer la valeur name,email et token pour les réutiliser par la suite

    updateProfil: (state, action) => {
      state.value.name = action.payload.name;
      state.value.breed = action.payload.breed;
      state.value.age = action.payload.age;
      state.value.gender = action.payload.gender;
      state.value.vaccins = action.payload.vaccins;
      state.value.aboutMe = action.payload.aboutMe;
      state.value.aboutMyOwner = action.payload.aboutMyOwner;
      state.value.images.push(action.payload.images);
    }, // idem pour les autres valeurs

    addPhoto: (state, action) => {
      state.value.images.push(action.payload);
    }, // 

    addRoom: (state, action) => {
      state.value.room = action.payload;
    }, // création de room

    addOtherUserName: (state, action) => {
      state.value.otherusername = action.payload;
    },

    deleteRoom: (state) => {
      state.value.room = null
    },

    logout: (state) => {
      state.value.email = null;
      state.value.name = null;
      state.value.breed = null;
      state.value.age = null;
      state.value.gender = null;
      state.value.vaccins = null;
      state.value.aboutMe = null;
      state.value.aboutMyOwner = null;
      state.value.images = [];
      state.value.token = null;
      state.value.room = null;
    },
}
})

export const { login, updateProfil, addPhoto, addRoom, addOtherUserName, deleteRoom,logout } = userSlice.actions;
export default userSlice.reducer;