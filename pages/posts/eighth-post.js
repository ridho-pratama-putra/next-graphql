import styles from "@/styles/FirstPost.module.css";
import utilsStyles from "@/styles/Utils.module.css";
import Link from "next/link";
import Head from "next/head";
import ImageLayout from "@/components/image-layout";
import Layout from "@/components/layout";
import Alert from "@/components/alert";
import useSWR from "swr"

export default function EighthPost() {

    // Define key sebagai URL endpoint API
    const key = "/api/allReleases";
    console.log('rerender')
    const {data, error} = useSWR(key, fetcher);
    console.log('data ', data)
    console.log('error ', error)

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    async function fetcher(url) {
        console.log('fetcher url ', url)
        const allReleases = await fetch(url);
        const res = await allReleases.json();
        console.log('fetcher allReleases ', res)

        return {
            albums: res.edges,
            pageInfo: {
                hasPreviousPage: res.pageInfo.hasPreviousPage,
                hasNextPage: res.pageInfo.hasNextPage,
                startCursor: res.pageInfo.startCursor,
                endCursor: res.pageInfo.endCursor
            }};
    }

    return (
        <Layout className={styles.container}>
            <Head>
                <title>Eighth Post</title>
            </Head>
            <main>
                <Alert type={'success'} children={'children of alert'}></Alert>
                <div className={styles.card}>
                    <h1 className={utilsStyles.heading2Xl}>Eighth Post</h1>
                    <ImageLayout imageSource="/images/img.png"></ImageLayout>
                    <p className={utilsStyles.headingXl}>implementation of SWR</p>

                    <p className={utilsStyles.padding30px}>
                        <Link href="/">
                            &larr;back to Dashboard
                        </Link>
                    </p>
                </div>
                {data.albums !== null && data.albums.map(({node: {id, title}}) => (
                    <li key={id}>
                        {title} ({id})
                    </li>
                ))}
                {data.albums == null && (<p>Try again later</p>)}
            </main>
        </Layout>);
}