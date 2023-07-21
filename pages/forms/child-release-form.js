import React, {useRef} from 'react';
import {Upload} from "tus-js-client";

function ChildReleaseForm() {

    const refDiv = useRef(null);
    let tusioUploadProcess;
    const handleResume = () => {
        if (tusioUploadProcess === null || tusioUploadProcess === 'undefined') {
            return
        }
        tusioUploadProcess.findPreviousUploads().then(function (previousUploads) {
            if (previousUploads.length) {
                tusioUploadProcess.resumeFromPreviousUpload(previousUploads[0]);
            }
            tusioUploadProcess.start();
        });
    }


    const handlePause = () => {
        if (tusioUploadProcess) {
            tusioUploadProcess.abort();
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const file = event.target.fileToUpload.files[0];
        tusioUploadProcess = new Upload(file, {
            endpoint: "http://localhost:8081/files/",
            retryDelays: [0, 3000, 5000, 10000, 20000],
            chunkSize: 1024 * 512,
            metadata: {
                filename: encodeURIComponent(file.name),
                filetype: file.type
            },
            onError: function (error) {
                console.log("Failed because: " + error)
                refDiv.current.textContent = "-5%";
            },
            onProgress: function (bytesUploaded, bytesTotal) {
                const percentage = (bytesUploaded / bytesTotal * 100).toFixed(0);
                refDiv.current.textContent = `Progress ${percentage}%`;
            },
            onSuccess: function () {

            },
        })

        tusioUploadProcess.start();
    }

    return (
        <>
            <hr/>
            <form onSubmit={handleSubmit}>
                <label>choose file to upload</label>
                <br/>
                <input type='file' name='fileToUpload' aria-label='please choose file to upload'/>
                <button type="submit">Submit</button>
            </form>
            <button onClick={handlePause}>pause</button>
            <button onClick={handleResume}>resume</button>
            <p ref={refDiv}></p>
            <hr/>
        </>
    );
}

export default ChildReleaseForm;