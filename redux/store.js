import { configureStore } from '@reduxjs/toolkit'
import fileUploadProgressReducer from '@/redux/fileUploadProgressSlice'
export const store = configureStore({
    reducer: {
        fileUploadProgress: fileUploadProgressReducer,
    },
})