import styles from "../../styles/FirstPost.module.css";
import utilsStyles from "../../styles/Utils.module.css";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import ImageLayout from "../../components/ImageLayout";
import Layout from "../../components/Layout";
import Alert from "../../components/Alert";
import apolloClient from "../../configs/apollo-client";
import {gql} from "@apollo/client";
/*
* single component first post
* */
export default function FirstPost({artist}) {
    return (
        <Layout className={styles.container}>
            <Head>
                <title>Second Post</title>
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
                    <h1 className={utilsStyles.heading2Xl}>Second Post</h1>
                    <ImageLayout imageSource="/images/img.png"></ImageLayout>
                    <p className={utilsStyles.padding30px}>
                        <Link href="/">
                            &larr;back to Dashboard
                        </Link>
                    </p>
                </div>
                {artist !== null && (<li key={artist.id}>
                    {artist.name}
                </li>)}
            </main>
        </Layout>);
}

export async function getServerSideProps() {
    try {
        console.log('getServerSideProps called');
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
                id: "63b00e9a0af151471889d0df"
            }
        })
        return {
            props: {
                artist: data.artistById
            }
        }
    } catch (e) {
        return {
            props: {
                artist: null
            }
        }
    }
}