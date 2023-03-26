import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: null
};

export const fileUploadProcessSlice = createSlice({
    name: 'fileUploadProcess',
    initialState: initialState,
    reducers: {
        setProcess: (state, action) => {
            state.value = action.payload
        },
        resetProcess: (state) => {
            state.value = null;
        }
    },
});

export const {setProcess, resetProcess} = fileUploadProcessSlice.actions;

export default fileUploadProcessSlice.reducer