import {Upload} from "tus-js-client";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import formidable from "formidable";
import fs from "fs";
import useStore from "@/store/songUploadProgressStore"

export const config = {
    api: {
        bodyParser: false
    }
}
export default function handler(req, res) {
    console.log('yea u coming ')
    const { setProgress } = useStore();
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) throw err;

        const { fileName, fileType} = fields;

        // Mengakses nilai-nilai form yang sudah diparse
        const fileToBeConvert = files.file;
        const buffer = fs.readFileSync(fileToBeConvert.filepath);
        // Create a new tus upload
        const upload = new Upload(buffer, {
            // Endpoint is the upload creation URL from your tus server
            endpoint: "http://localhost:8080/files/",
            // Retry delays will enable tus-js-client to automatically retry on errors
            retryDelays: [0, 3000, 5000, 10000, 20000],
            chunkSize: 1024 * 512,
            // Attach additional metadata about the file for the server
            metadata: {
                filename: fileName,
                filetype: fileType
            },
            // Callback for errors which cannot be fixed using retries
            onError: function (error) {
                console.log("Failed because: " + error)
                return res.status(400).json({ data: `Failed because: ${error} `})
            },
            // Callback for reporting upload progress
            onProgress: function (bytesUploaded, bytesTotal) {
                const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
                console.log(bytesUploaded, bytesTotal, percentage + "%")
                setProgress(percentage)
            },
            // Callback for once the upload is completed
            onSuccess: function () {
                console.log("Download %s from %s", upload.file.name, upload.url)
                res.status(201).json({data: upload.url})
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
        })
    })
    console.log('fieldss')
}