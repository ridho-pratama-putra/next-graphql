import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { upload } from '@/lib/upload'
import {setProcess} from "@/redux/fileUploadProcessSlice";

function ReleaseForm() {
    const dispatch = useDispatch();
    const { progress, process } = useSelector(state => ({
        progress: state.fileUploadProgress.value,
        process: state.fileUploadProcess.value
    }))

    useEffect(() => {
        if (process) {
            handleResume();
        }
        return () => {};
    }, [process]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const tusioUploadProcess = await upload(dispatch, event.target.file);
        dispatch(setProcess(tusioUploadProcess));
    }

    const handlePause = async () => {
        process.abort();
    }

    const handleResume = () => {
        console.log('rf handle resume :: 1')
        process.findPreviousUploads().then(function (previousUploads) {
            console.log('rf handle resume :: 2')
            if (previousUploads.length) {
                console.log('rf handle resume :: 3')
                process.resumeFromPreviousUpload(previousUploads[0]);
            }
            console.log('rf handle resume :: 4')
            process.start();
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="file">file:</label>
                <input type="file" id="file" name="file"/>
                <button type="submit">Submit</button>
            </form>
            <button onClick={handlePause}>pause</button>
            <button onClick={handleResume}>resume</button>
            <p>Progress {progress}% </p>
        </div>
    );
}

export default ReleaseForm;