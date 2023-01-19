import apolloClient from "../configs/apollo-client";
import {gql} from "@apollo/client";

export async function loadAllAlbums() {
    const {data} = await apolloClient.query({
        query: gql`
            query($first: Int, $after: String) {
                allAlbums(first: $first, after: $after) {
                    edges {
                        cursor
                        node {
                            id
                            title
                            creationDate
                            artist {
                                name
                            }
                        }
                    }
                    pageInfo {
                        hasPreviousPage
                        hasNextPage
                        startCursor
                        endCursor
                    }
                }
            }
        `,
        variables: {
            first: 3,
            after: "",
        }
    });

    return data;
}