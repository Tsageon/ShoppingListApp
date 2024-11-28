import { createSlice } from "@reduxjs/toolkit";

const offlineSlice = createSlice({
  name: "offline",
  initialState: {
    actions: [], 
  },
  reducers: {
    loadOfflineActions: (state, action) => {
      state.actions = action.payload;
    },
    addOfflineAction: (state, action) => {
      state.actions.push(action.payload);
    },
    clearOfflineActions: (state) => {
      state.actions = [];
    },
  },
});

export const { loadOfflineActions, addOfflineAction, clearOfflineActions } = offlineSlice.actions;
export default offlineSlice.reducer;

export const loadOfflineActionsOnStartup = (dispatch) => {
    const savedActions = JSON.parse(localStorage.getItem("offlineActions")) || [];
    dispatch(loadOfflineActions(savedActions));
  };