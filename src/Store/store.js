import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import headerSliceReducers from "./slices/headerSlice";
import taskSliceReducers from "./slices/taskSlice";

const rootReducer = combineReducers(
    {
        task  :taskSliceReducers,
        header: headerSliceReducers
  });
  export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  });