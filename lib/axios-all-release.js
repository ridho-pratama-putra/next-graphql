import axios from "axios";

export async function loadAllReleases() {
    const {data} = await axios.get("http://localhost:8080/allRelease")
    console.log('axios :: loadAllReleases ', data)
    return data;
}