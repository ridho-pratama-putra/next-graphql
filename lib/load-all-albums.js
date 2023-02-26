import apolloClient from "../configs/apollo-client";
import {gql} from "@apollo/client";

export async function loadAllAlbums(first, after) {
    const {data} = await apolloClient.query({
        query: gql`
            query($first: Int, $after: String) {
                allReleases(first: $first, after: $after) {
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
            first: first,
            after: after,
        }
    });

    return data;
}