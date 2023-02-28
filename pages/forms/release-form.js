import React from 'react';

function ReleaseForm() {

    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            first: event.target.first.value,
            last: event.target.last.value,
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = '/api/form'

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata
        }

        // Send the form data to our forms API on Vercel and get a response.
        console.log('next to data 1')
        const response = await fetch(endpoint, options)
        console.log('next to data 2')

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        console.log('next to file 1')
        const result = await response.json()
        console.log('next to file 3')
        alert(`Is this your full name: ${result.data}`)
        console.log('next to file 4 ', result.data)

        // API endpoint where we send form data.
        const imageEndpoint = '/api/file';
        const formData = new FormData();
        formData.append("file", event.target.file.files[0]);
        formData.append("fileName", event.target.file.files[0].name);
        formData.append("fileType", event.target.file.files[0].type);

        // Form the request for sending data to the server.
        const imageOptions = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Body of the request is the JSON data we created above.
            body: formData,
        }

        // Send the form data to our forms API on Vercel and get a response.
        const imageResponse = await fetch(imageEndpoint, imageOptions)

        const imageResult = await imageResponse.json()
        console.log('next to file 3')
        alert(`Is this your imageResult: ${imageResult.data}`)
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
        </div>
    );
}

export default ReleaseForm;