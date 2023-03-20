import apolloClient from "../configs/apollo-client";
import {gql} from "@apollo/client";

export async function loadAllReleases(first, after) {
    const {data} = await apolloClient.query({
        query: gql`
            query {
                users  {
                    id
                    email
                    name
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