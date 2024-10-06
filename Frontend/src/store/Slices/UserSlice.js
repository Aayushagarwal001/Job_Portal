import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        loading: false,
        isAuthenticated: false,
        error: null,
        message: null,
    },
    reducers: {
        registerRequest(state, action){
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.message = null;
            state.error = null;
        },
        registerSuccess(state, action){
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
            state.error = null;
        },
        registerFailed(state, action){
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.message = null;
            state.error = action.payload; 
        },
        loginRequest(state, action){
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.message = null;
            state.error = null;
        },
        loginSuccess(state, action){
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.message = action.payload.message;
            state.error = null;
        },
        loginFailed(state, action){
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.message = null;
            state.error = action.payload; 
        },
        fetchUserRequest(state, action) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
          },
        fetchUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        fetchUserFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;
        },
        logoutSuccess(state, action) {
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
        },
        logoutFailed(state, action) {
            state.isAuthenticated = state.isAuthenticated;
            state.user = state.user;
            state.error = action.payload;
        },
        clearAllErrors(state, action) {
            state.error = null;
            state.jobs = state.jobs;
          },
    },
});

export const register = (data) => async(dispatch) => {
    dispatch(userSlice.actions.registerRequest());
    try {
        const response = await axios.post(
            "http://localhost:4000/api/v1/user/register", 
            data, 
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        dispatch(userSlice.actions.registerSuccess(response.data));
        dispatch(userSlice.clearAllErrors()); // 
    } catch (error) {
        dispatch(userSlice.actions.registerFailed(error.response.data.message));
    }
};

export const login = (data) => async(dispatch) => {
    dispatch(userSlice.actions.loginRequest());
    try {
        const response = await axios.post(
            "http://localhost:4000/api/v1/user/login", 
            data, 
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            }
        );
        dispatch(userSlice.actions.loginSuccess(response.data));
        dispatch(userSlice.actions.clearAllErrors()); // 
    } catch (error) {
        dispatch(userSlice.actions.loginFailed(error.response.data.message));
    }
}

export const getUser = () => async (dispatch) => {
    dispatch(userSlice.actions.fetchUserRequest());
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/getuser",
        {
          withCredentials: true,
        }
      );
      dispatch(userSlice.actions.fetchUserSuccess(response.data.user));
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(userSlice.actions.fetchUserFailed(error.response.data.message));
    }
};

export const logout = () => async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      dispatch(userSlice.actions.logoutSuccess());
      dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(userSlice.actions.logoutFailed(error.response.data.message));
    }
};

export const clearAllUserErrors = () => (dispatch) => {
    dispatch(userSlice.actions.clearAllErrors());
};

export default userSlice.reducer; 