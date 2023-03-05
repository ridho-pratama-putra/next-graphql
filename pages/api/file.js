import {Upload} from "tus-js-client";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import formidable from "formidable";
import fs from "fs";
import {store} from '@/redux/store'
import { useDispatch } from "react-redux";
import {updateUploadProgress} from '@/redux/fileUploadProgressSlice';

export const config = {
    api: {
        bodyParser: false
    }
}
export default function handler(req, res) {
    const form = new formidable.IncomingForm();
    // const dispatch = useDispatch();
    // dispatch(updateUploadProgress(9))
    store.dispatch(updateUploadProgress(9));

    form.parse(req, (err, fields, files) => {
        if (err) throw err;
        const {fileName, fileType} = fields;
        const fileToBeConvert = files.file;
        const buffer = fs.readFileSync(fileToBeConvert.filepath);
        const upload = new Upload(buffer, {
            endpoint: "http://localhost:8080/files/",
            retryDelays: [0, 3000, 5000, 10000, 20000],
            chunkSize: 1024 * 512,
            metadata: {
                filename: fileName,
                filetype: fileType
            },
            onError: function (error) {
                console.log("Failed because: " + error)
                return res.status(400).json({data: `Failed because: ${error} `})
            },
            onProgress: function (bytesUploaded, bytesTotal) {
                const percentage = (bytesUploaded / bytesTotal * 100).toFixed(0);
                console.log(bytesUploaded, bytesTotal, percentage + "%")
                store.dispatch(updateUploadProgress(percentage));
            },
            onSuccess: function () {
                console.log("Download %s from %s", upload.file.name, upload.url)
                res.status(201).json({data: "upload.url"})
            }
        });

        upload.findPreviousUploads().then(function (previousUploads) {
            if (previousUploads.length) {
                upload.resumeFromPreviousUpload(previousUploads[0])
            }
            upload.start()
        })
    })
}