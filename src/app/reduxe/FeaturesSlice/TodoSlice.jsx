import { createSlice } from "@reduxjs/toolkit";

const TodoSlice = createSlice({
    name: 'list',
    initialState: {
        items: []
    },
    reducers: {
        addList: (state, action) => {
            state.items.push({ id: Date.now(), text: action.payload });
        },
        deleteList: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateList: (state, action) => {
            const { id, newText } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.text = newText;
            }
        }
    }
});

export const { addList, deleteList, updateList } = TodoSlice.actions;
export default TodoSlice.reducer;
