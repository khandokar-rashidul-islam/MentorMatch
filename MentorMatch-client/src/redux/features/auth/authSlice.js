import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  user: null, // { _id, name, profileImage, activeRole, role }
  roleProfile: null, // 'learner' | 'mentor'
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, roleProfile } = action.payload;
      state.user = user;
      state.roleProfile = roleProfile ?? user?.activeRole ?? state.roleProfile;
    },
    logout: (state) => {
      state.user = null;
      state.roleProfile = null;
    },
    switchRole: (state, action) => {
      state.roleProfile = action.payload;
    },
  },
});

export const { setUser, logout, switchRole } = authSlice.actions;

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "roleProfile"],
};

export default persistReducer(persistConfig, authSlice.reducer);
