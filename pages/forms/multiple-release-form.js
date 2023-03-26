import React, {useState} from 'react';
import ChildReleaseForm from '@/pages/forms/child-release-form'

function MutltipleReleaseForm() {
    const [howMuchFileToUpload, setHowMuchFileToUpload] = useState(0);
    const addFileToUpload = () => {
        setHowMuchFileToUpload(current => current + 1)
    }

    return (
        <>
            <button onClick={addFileToUpload}> + add file to upload+</button>
            {[...Array(howMuchFileToUpload)].map((_, index) => (
                <ChildReleaseForm key={index} />
            ))}
        </>
    );
}

export default MutltipleReleaseForm;
