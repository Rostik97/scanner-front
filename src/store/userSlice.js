import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: null,
    token: null,
    name: null,
    id: null
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            console.log("REDUX")
            console.log(action)
            state.token = action.payload.token;
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
        }
    }
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;