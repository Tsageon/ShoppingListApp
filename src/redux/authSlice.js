import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  error: null,  authLoading: false, 
};



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    registerSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
    },
    setAuthLoading: (state, action) => { 
        state.authLoading = action.payload;
        state.error = null;
      },
    logout: (state) => {
      state.currentUser = null;
      state.error = null;
      state.authLoading = false;
    },
  },
});


export const { 
  loginSuccess, 
  loginFailure, 
  registerSuccess, 
  registerFailure, 
  setAuthLoading,
  logout 
} = authSlice.actions;


export const login = (email, password) => {
    return async (dispatch) => {
      dispatch(setAuthLoading(true)); 
      const users = JSON.parse(localStorage.getItem('Users')) || [];
      const user = users.find(user => user.email === email && user.password === password);
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        dispatch(loginSuccess(user));
      } else {
        dispatch(loginFailure('Invalid email or password.'));
      }
      dispatch(setAuthLoading(false));
    };
  };
  
  export const register = (email, password) => {
    return async (dispatch) => {
      dispatch(setAuthLoading(true)); 
      const users = JSON.parse(localStorage.getItem('Users')) || [];
      const userExists = users.some(user => user.email === email);
  
      if (userExists) {
        dispatch(registerFailure('Email already exists.'));
      } else {
        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem('Users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        dispatch(registerSuccess(newUser));
      }
      dispatch(setAuthLoading(false)); 
    };
  };
  
  

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
  return logout();
};


export default authSlice.reducer;