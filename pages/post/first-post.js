import styles from "../../styles/FirstPost.module.css";
import utilsStyles from "../../styles/Utils.module.css";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import ImageLayout from "../../components/ImageLayout";
import Layout from "../../components/Layout";
import Alert from "../../components/Alert";
import apolloClient from "../../configs/apollo-client";
import { gql } from "@apollo/client";
/*
* single component first post
* */
export default function FirstPost() {
    return (
        <Layout className={styles.container}>
            <Head>
                <title>First Post</title>
            </Head>
            <Script
                src="https://connect.facebook.net/en_US/sdk.js"
                strategy="lazyOnload"
                onLoad={() =>
                    console.log(`script loaded correctly, window.FB has been populated`)
                }
            />
            <main>
                <Alert type={'success'} children={'children of alert'}></Alert>
                <div className={styles.card}>
                    <h1 className={utilsStyles.heading2Xl}>First Post</h1>
                    <ImageLayout imageSource="/images/img.png"></ImageLayout>
                    <p className={utilsStyles.headingXl}>Lets make group call by entering room name</p>
                    <p className={utilsStyles.headingMd}>this group call will be recorded, please allow permissions for
                        mic & camera
                    </p>
                    <p className={utilsStyles.padding30px}>
                        <Link href="/">
                            &larr;back to Dashboard
                        </Link>
                    </p>
                </div>
            </main>
        </Layout>);
}


export async function getServerSideProps() {
    const { data } = await apolloClient.query({
        query: gql`
            query($first: Int, $after: String) {
                allAlbums(first: $first, after: $after) {
                    edges {
                        cursor
                        node {
                            id
                            title
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
            first : 2,
            after: "",
        }
    })
    return {
        props: {
            albums: data.allAlbums.edges,
            pageInfo: {
                hasPreviousPage: data.allAlbums.pageInfo.hasPreviousPage,
                hasNextPage: data.allAlbums.pageInfo.hasNextPage,
                startCursor: data.allAlbums.pageInfo.startCursor,
                endCursor: data.allAlbums.pageInfo.endCursor
            }
        }
    }
}