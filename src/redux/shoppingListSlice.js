import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lists: JSON.parse(localStorage.getItem('shoppingLists')) || [], 
};

const shoppinglistSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    addList: (state, action) => {
      state.lists.push(action.payload);
      localStorage.setItem('shoppingLists', JSON.stringify(state.lists));
    },
    addItem: (state, action) => {
      const { listId, item } = action.payload;
      const list = state.lists.find((l) => l.id === listId);
      if (list) {
        list.items.push(item);
        localStorage.setItem('shoppingLists', JSON.stringify(state.lists));
      }
    },
    removeItem: (state, action) => {
      const { listId, itemId } = action.payload;
      const list = state.lists.find((l) => l.id === listId);
      if (list) {
        list.items = list.items.filter((item) => item.id !== itemId);
        localStorage.setItem('shoppingLists', JSON.stringify(state.lists));
      }
    },
    updateItem: (state, action) => {
      const { listId, itemId, updatedItem } = action.payload;
      const list = state.lists.find((l) => l.id === listId);
      if (list) {
        const index = list.items.findIndex((item) => item.id === itemId);
        if (index !== -1) {
          list.items[index] = updatedItem;
          localStorage.setItem('shoppingLists', JSON.stringify(state.lists));
        }
      }
    },
    toggleChecked: (state, action) => {
      const { listId, itemId } = action.payload;
      const list = state.lists.find((l) => l.id === listId);
      if (list) {
        const item = list.items.find((item) => item.id === itemId);
        if (item) {
          item.checked = !item.checked;
          localStorage.setItem('shoppingLists', JSON.stringify(state.lists));
        }
      }
    },
    initializeLists: (state, action) => {
      state.lists = action.payload;
    },
    shareList: (state, action) => {
      const { listId, email } = action.payload;
      const list = state.lists.find((l) => l.id === listId);
      if (list) {
        console.log(`List ${listId} shared with ${email}`);
        if (!list.sharedWith) {
          list.sharedWith = [];
        }
        list.sharedWith.push(email);
        localStorage.setItem('shoppingLists', JSON.stringify(state.lists));
      }
    },
  },
});

export const { addList, addItem, removeItem, updateItem, toggleChecked, initializeLists,shareList } = shoppinglistSlice.actions;
export default shoppinglistSlice.reducer;
