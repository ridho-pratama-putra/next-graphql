import apolloClient from "../configs/apollo-client";
import {gql} from "@apollo/client";

export async function loadArtisById(id) {
    console.log('export async function loadArtisById(id) {')
    const {data} = await apolloClient.query({
        query: gql`
            query($id: ID) {
                artistById(id: $id) {
                    id
                    name
                }
            }
        `,
        variables: {
            id: id
        }
    })
    console.log('done apollo ', data)
    return data
}