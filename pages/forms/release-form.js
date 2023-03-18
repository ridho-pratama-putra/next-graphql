import React, {useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { upload } from '@/lib/upload'
import {resetProcess, setProcess} from "@/redux/fileUploadProcessSlice";

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
            dispatch(resetProcess(null))
        }
        return () => {};
    }, [progress]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const data = {
        //     first: event.target.first.value,
        //     last: event.target.last.value,
        // }
        // const JSONdata = JSON.stringify(data)
        // const endpoint = '/api/form'
        // const options = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSONdata
        // }
        // const response = await fetch(endpoint, options)
        // const result = await response.json()
        // alert(`Is this your full name: ${result.data}`)

        const tusioUploadProcess = await upload(dispatch, event.target.file);
        dispatch(setProcess(tusioUploadProcess));
        setDisabledForm(true)
    }

    const handlePause = () => {
        if (process) {
            process.abort();
        }
    }

    const handleResume = () => {
        if (process === null || process === 'undefined') {
            return
        }
        process.findPreviousUploads().then(function (previousUploads) {
            if (previousUploads.length) {
                process.resumeFromPreviousUpload(previousUploads[0]);
            }
            process.start();
        });
    }

    return (
        <div>
            <form role='form-upload' onSubmit={handleSubmit}>
                {/*<label htmlFor="first">First name:</label>*/}
                {/*<input type="text" id="first" name="first"/>*/}
                {/*<label htmlFor="last">Last name:</label>*/}
                {/*<input type="text" id="last" name="last"/>*/}
                <label htmlFor="file" data-testid='label-input-file'>file:</label>
                <input type="file" id="file" name="file" ref={fileFormRef} data-testid='input-file' disabled={disabledForm}/>
                <button type="submit" disabled={disabledForm}>Submit</button>
            </form>
            <button onClick={handlePause}>pause</button>
            <button onClick={handleResume}>resume</button>
            <p>Progress {progress}% </p>
        </div>
    );
}

export default ReleaseForm;
