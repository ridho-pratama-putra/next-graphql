import { useEffect } from 'react';
import {Upload} from 'tus-js-client';
import useUploadStore from '@/store/songUploadProgressStore';
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";

const useFileUpload = (file) => {
    if (!file) {
        return;
    }
    const { setProgress } = useUploadStore();
    console.log('useFileUpload called')
    useEffect(() => {
        console.log('useFileUpload useEffect called')

        const upload = new Upload(file, {
            endpoint: "http://localhost:8080/files/",
            retryDelays: [0, 3000, 5000, 10000, 20000],
            chunkSize: 1024 * 512,
            metadata: {
                filename: file.name,
                filetype: file.type
            },
            onError: function (error) {
                console.log("Failed because: " + error)
            },
            onProgress: function (bytesUploaded, bytesTotal) {
                const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
                setProgress(`${percentage}%`);
            },
            onSuccess: function () {
                console.log("Download %s from %s", upload, upload.url)
            }
        });

        // Check if there are any previous uploads to continue.
        upload.findPreviousUploads().then(function (previousUploads) {
            // Found previous uploads so we select the first one.
            if (previousUploads.length) {
                upload.resumeFromPreviousUpload(previousUploads[0])
            }

            // Start the upload
            upload.start()
        });
    }, []);

    return { progress: useUploadStore.getState().progress };
};

export default useFileUpload;