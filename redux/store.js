import {configureStore} from '@reduxjs/toolkit'
import fileUploadProgressReducer from '@/redux/fileUploadProgressSlice'
import fileUploadProcessReducer from "@/redux/fileUploadProcessSlice";
import resultSliceReducer from "@/redux/resultSlice";

/*THINK OF SLICE is equal to REDUCER*/
export const store = configureStore({
    reducer: {
        fileUploadProgress: fileUploadProgressReducer,
        fileUploadProcess: fileUploadProcessReducer,
        result: resultSliceReducer
    }, middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})