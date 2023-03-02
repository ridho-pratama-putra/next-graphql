import React, { useState } from 'react';

function ReleaseForm() {
    const [title, setTitle] = useState('');
    const [single, setSingle] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault()
        const imageEndpoint = '/api/file';
        const formData = new FormData();
        formData.append("file", single);
        formData.append("fileName", single.name);
        formData.append("fileType", single.type);

        const imageOptions = {
            method: 'POST',
            body: formData,
        }

        const imageResponse = await fetch(imageEndpoint, imageOptions)

        const imageResult = await imageResponse.json()
        if (imageResult.status === 'in progress') {
            console.log('masih')
        } else if (imageResult.status === 'success') {
            console.log('sudah')
        } else {
        console.log('lain')
    }
    }

    console.log('render')
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="artist">Artist:</label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={(e) => setSingle(e.target.files[0])}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ReleaseForm;