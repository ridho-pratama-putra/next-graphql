import {updateUploadProgress} from '@/redux/fileUploadProgressSlice'
import {store} from "@/redux/store";
import {Upload} from "tus-js-client";

export const upload = (dispatch, files) => {
    const fileName = files.files[0].name.replace(/ /g, "_");
    const fileType = files.files[0].type;
    const file = files.files[0];
    const upload = new Upload(file, {
        endpoint: "http://localhost:8080/files/",
        retryDelays: [0, 3000, 5000, 10000, 20000],
        chunkSize: 1024 * 512,
        metadata: {
            filename: fileName,
            filetype: fileType
        },
        onError: function (error) {
            console.log("Failed because: " + error)
            store.dispatch(updateUploadProgress(-5));
        },
        onProgress: function (bytesUploaded, bytesTotal) {
            const percentage = (bytesUploaded / bytesTotal * 100).toFixed(0);
            console.log(bytesUploaded, bytesTotal, percentage + "%")
            store.dispatch(updateUploadProgress(percentage));
        },
        onSuccess: function () {
            store.dispatch(updateUploadProgress(100));
        }
    });

    upload.findPreviousUploads().then(function (previousUploads) {
        if (previousUploads.length) {
            upload.resumeFromPreviousUpload(previousUploads[0])
        }
        upload.start()
    })
}