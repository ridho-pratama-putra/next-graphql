import styles from "@/styles/FirstPost.module.css";
import utilsStyles from "@/styles/Utils.module.css";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import ImageLayout from "@/components/image-layout";
import Layout from "@/components/layout";
import Alert from "@/components/alert";
import {loadArtisById} from "@/lib/load-artis-by-id";
/*
* single component second post
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
                    <p className={utilsStyles.headingXl}>implementation of getServerSideProps</p>
                    <p className={utilsStyles.padding30px}>
                        <Link href="/">
                            &larr;back to Dashboard
                        </Link>
                    </p>
                </div>
                {artist !== null && (<li key={artist.id}>
                    {artist.name}
                </li>)}
                {artist == null && (<p>Try again later</p>)}
            </main>
        </Layout>);
}

export async function getServerSideProps() {
    try {
        console.log('getServerSideProps called');
        let data = await loadArtisById("63c911b6a272812098224d7c");
        await console.log('loaded data ', data)
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
