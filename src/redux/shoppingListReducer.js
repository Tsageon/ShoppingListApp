const initialState = {
  items: [],};

const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {...state,items: [...state.items,{name: action.payload, checkedOut: false}],};

    case 'REMOVE_ITEM':
      return {...state,items: state.items.filter((item, index) => index !== action.payload),};

    case 'UPDATE_ITEM':
      return {...state,items: state.items.map((item, index) => 
          index === action.payload.index
            ? {...item, name: action.payload.newName}: item),};

    case 'CHECKOUT_ITEM':
      return {...state, items: state.items.map((item, index) => 
          index === action.payload
            ? {...item, checkedOut: true}: item),};

    default:
      return state;}};

export default shoppingListReducer;