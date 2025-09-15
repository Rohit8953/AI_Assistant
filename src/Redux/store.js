import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./apiSlice";

// Create a Redux store with the cardReducer
// This store will manage the state of the cards in the application
export const store = configureStore({
  reducer: {
    api: apiReducer,
  },
});

export default store;