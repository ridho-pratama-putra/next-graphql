import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { plusOne } from '@/redux/fileUploadProgressSlice'

import { upload } from '@/lib/upload'

function ReleaseForm() {
    const dispatch = useDispatch();
    const progress = useSelector((state) => {
        return state.fileUploadProgress.value
    })

    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            first: event.target.first.value,
            last: event.target.last.value,
        }
        const JSONdata = JSON.stringify(data)
        const endpoint = '/api/form'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata
        }

        const response = await fetch(endpoint, options)
        const result = await response.json()
        // alert(`Is this your full name: ${result.data}`)
        const imageEndpoint = '/api/file';
        const formData = new FormData();
        formData.append("file", event.target.file.files[0]);
        formData.append("fileName", event.target.file.files[0].name);
        formData.append("fileType", event.target.file.files[0].type);
        const imageOptions = {
            method: 'POST',
            body: formData,
        }

        // const imageResponse = await fetch(imageEndpoint, imageOptions)
        // const imageResult = await imageResponse.json()
        // console.log(`imageResult :: ${imageResult.data}`);

        await upload(dispatch, event.target.file)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="first">First name:</label>
                <input type="text" id="first" name="first"/>
                <label htmlFor="last">Last name:</label>
                <input type="text" id="last" name="last"/>
                <label htmlFor="file">file:</label>
                <input type="file" id="file" name="file"/>
                <button type="submit">Submit</button>
            </form>
            <button onClick={() => dispatch(plusOne())}>+</button>
            <p>Progress {progress}% </p>
        </div>
    );
}

export default ReleaseForm;