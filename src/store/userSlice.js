import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: null,
    token: null,
    userName: null,
    id: null
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            console.log("REDUX", action)
            console.log(action)
            state.token = action.payload.token;
            state.userName = action.payload.username;
            localStorage.setItem('token', action.payload.token)
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
            state.userName = null;
            localStorage.removeItem('token');
        }
    }
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;