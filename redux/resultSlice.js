import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: null
};

export const resultSlice = createSlice({
    name: 'result',
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

export const {setProcess, resetProcess} = resultSlice.actions;

export default resultSlice.reducer