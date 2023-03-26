import styles from "@/styles/FirstPost.module.css";
import utilsStyles from "@/styles/Utils.module.css";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import ImageLayout from "@/components/image-layout";
import Layout from "@/components/layout";
import Alert from "@/components/alert";
import {useEffect, useState} from "react";
/*
* single component first post
* */
export default function SeventhPost({albums}) {
    const [count, setCount] = useState(0);
    const [satu, setSatu] = useState(0);

    // Similar to componentDidMount and componentDidUpdate:
    // also executed when
    // - only once when empty list
    // - any state changes when no deps
    // - any state changes as listed in deps list
    useEffect(() => {
        console.log('sata')
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });

    return (
        <Layout className={styles.container}>
            <Head>
                <title>Seventh Post</title>
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
                    <h1 className={utilsStyles.heading2Xl}>Seventh Post</h1>
                    <ImageLayout imageSource="/images/img.png"></ImageLayout>
                    <p className={utilsStyles.headingXl}>implementation of useEffect</p>
                    <p className={utilsStyles.headingMd}>{count}</p>
                    <button onClick={() => setCount(count + 1)}>add</button>
                    <button onClick={() => setCount(count - 1)}>min</button>

                    <p className={utilsStyles.padding30px}>
                        <Link href="/">
                            &larr;back to Dashboard
                        </Link>
                    </p>
                </div>
            </main>
        </Layout>);
}