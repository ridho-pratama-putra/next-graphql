import styles from "@/styles/FirstPost.module.css";
import utilsStyles from "@/styles/Utils.module.css";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import ImageLayout from "@/components/image-layout";
import Layout from "@/components/layout";
import Alert from "@/components/alert";
import {useSelector} from "react-redux";
/*
 * single component first post
 * */
export default function FirstPost({albums}) {

    const progress = useSelector((state) => state.fileUploadProgress.value);
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
                    <p className={utilsStyles.headingXl}>implementation of getStaticProps</p> {progress}
                    <p className={utilsStyles.padding30px}>
                        <Link href="/">
                            &larr;back to Dashboard
                        </Link>
                    </p>
                </div>
                {albums !== null && albums.map(({id, name}) => (
                    <li key={id}>
                        {name} ({id})
                    </li>
                ))}
                {albums == null && (<p>Try again later</p>)}
            </main>
        </Layout>);
}

export async function getStaticProps() {
    try {
        const data = await fetch("https://jsonplaceholder.typicode.com/users")
        const result = await data.json()
        return {
            props: {
                albums: result
            }
        }
    } catch (e) {
        return {
            props: {
                albums: null
            }
        }
    }
}
