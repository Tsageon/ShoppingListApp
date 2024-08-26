import { createSlice } from '@reduxjs/toolkit';

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState: {
    lists: [],
  },
  reducers: {
    addItem: (state, action) => {
      const { listId, item } = action.payload;
      const list = state.lists.find(l => l.id === listId);
      if (list) {
        list.items.push(item);
      }},
      
    removeItem: (state, action) => {
      const { listId, itemId } = action.payload;
      const list = state.lists.find(l => l.id === listId);
      if (list) {
        list.items = list.items.filter(item => item.id !== itemId);
      }},
    updateItem: (state, action) => {
      const { listId, itemId, updatedItem } = action.payload;
      const list = state.lists.find(l => l.id === listId);
      if (list) {
        const index = list.items.findIndex(item => item.id === itemId);
        if (index !== -1) {
          list.items[index] = updatedItem;
        }
      }
    },
    toggleChecked: (state, action) => {
      const { listId, itemId } = action.payload;
      const list = state.lists.find(l => l.id === listId);
      if (list) {
        const item = list.items.find(item => item.id === itemId);
        if (item) {
          item.checked = !item.checked;
        }
      }
    },
    addList: (state, action) => {
      state.lists.push(action.payload);
    },
    removeList: (state, action) => {
      state.lists = state.lists.filter(list => list.id !== action.payload);
    },
    setLists: (state, action) => {
      state.lists = action.payload;
    },
  },
});

export const { addItem, removeItem, updateItem, toggleChecked, addList, removeList, setLists } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
