import React, {useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { upload } from '@/lib/upload'
import {setProcess} from "@/redux/fileUploadProcessSlice";

function ReleaseForm() {
    const dispatch = useDispatch();
    const [disabledForm, setDisabledForm] = useState(false);
    const fileFormRef = useRef(null);
    const { progress, process } = useSelector(state => ({
        progress: state.fileUploadProgress.value,
        process: state.fileUploadProcess.value
    }));

    useEffect(() => {
        if (process) {
            handleResume();
        }
        return () => {};
    }, [process]);

    useEffect(() => {
        if (100 === progress) {
            setDisabledForm(false);
            fileFormRef.current.value = null;
            dispatch(setProcess(null))
        }
        return () => {};
    }, [progress]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const tusioUploadProcess = await upload(dispatch, event.target.file);
        dispatch(setProcess(tusioUploadProcess));
        setDisabledForm(true)
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
                <input type="file" id="file" name="file" ref={fileFormRef} disabled={disabledForm}/>
                <button type="submit" disabled={disabledForm}>Submit</button>
            </form>
            <button onClick={handlePause}>pause</button>
            <button onClick={handleResume}>resume</button>
            <p>Progress {progress}% </p>
        </div>
    );
}

export default ReleaseForm;