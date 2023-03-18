import {loadAllReleases} from "@/lib/load-all-releases"

export default async function handler(req, res) {
    console.log('getStaticProps [1]')
    const data = await loadAllReleases(3, null)
    console.log('getStaticProps [1.1]')
    return res.status(200).json(data);
}