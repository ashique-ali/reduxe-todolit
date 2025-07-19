import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from './FeaturesSlice/TodoSlice';

export const Store = configureStore({
    reducer: {
        todo: TodoReducer
    }
})
