import {loadAllReleases} from "@/lib/load-all-releases"

export default async function handler(req, res) {
    const {allReleases} = await loadAllReleases(3, null)
    return res.status(200).json(allReleases);
}