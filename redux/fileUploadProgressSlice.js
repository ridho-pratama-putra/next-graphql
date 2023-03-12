import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: null,
}

export const fileUploadProgressSlice = createSlice({
    name: 'fileUploadProgress',
    initialState: initialState,
    reducers: {
        updateUploadProgress: (state, action) => {
            state.value = Number(action.payload)
        },
    },
})

// Action creators are generated for each case reducer function
export const {updateUploadProgress} = fileUploadProgressSlice.actions

export default fileUploadProgressSlice.reducer