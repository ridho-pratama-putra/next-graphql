import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: null,
}

export const fileUploadProgressSlice = createSlice({
    name: 'fileUploadProgress',
    initialState: initialState,
    reducers: {
        updateUploadProgress: (state, action) => {
            const result = Number(action.payload);
            console.log(state.value, " :: ", result, ' = ', typeof result)
            state.value = result
        },
    },
})

// Action creators are generated for each case reducer function
export const {updateUploadProgress, plusOne} = fileUploadProgressSlice.actions

export default fileUploadProgressSlice.reducer