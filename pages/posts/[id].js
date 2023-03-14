import styles from "@/styles/FirstPost.module.css";
import utilsStyles from "@/styles/Utils.module.css";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import ImageLayout from "@/components/image-layout";
import Layout from "@/components/layout";
import Alert from "@/components/alert";
import DateComponent from "@/components/date-component";
import {useRouter} from "next/router";
import {loadAllReleases} from "@/lib/load-all-releases";
/*
* single component first post
* */
export default function Post({albums}) {
    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading nihh bosss...</div>
    }

    return (
        <Layout className={styles.container}>
            <Head>
                <title>Dynamic Path</title>
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
                    <h1 className={utilsStyles.heading2Xl}>not first & second Post</h1>
                    <ImageLayout imageSource="/images/img.png"></ImageLayout>
                    <p className={utilsStyles.headingXl}>implematation of fallback: true</p>
                    <p className={utilsStyles.headingMd}>{router.asPath}
                    </p>
                    <p className={utilsStyles.padding30px}>
                        <Link href="/">
                            &larr;back to Dashboard
                        </Link>
                    </p>
                </div>
                {(albums == null) && (<div>Try Again later</div>)}
                {albums !== null && albums.map(({node: {id, title, creationDate}}) => (
                    <li key={id}>
                        {title}
                        <br/>
                        <DateComponent dateString={creationDate}/>
                        <br/>
                    </li>
                ))}
            </main>
        </Layout>);
}

export async function getStaticProps({params}) {
    try {
        let data = await loadAllReleases(3, "");
        return {
            props: {
                albums: data.allReleases.edges,
                pageInfo: {
                    hasPreviousPage: data.allReleases.pageInfo.hasPreviousPage,
                    hasNextPage: data.allReleases.pageInfo.hasNextPage,
                    startCursor: data.allReleases.pageInfo.startCursor,
                    endCursor: data.allReleases.pageInfo.endCursor
                }
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

export async function getStaticPaths() {
    // paths.params.id --> should be the same as stated in filename
    const paths = [
        {
            params: {
                id: 'third-post'
            }
        },
        {
            params: {
                id: 'fourth-post'
            }
        }, {
            params: {
                id: 'fifth-post'
            }
        }
    ]
    /*
    * fallback true will ignore render 404.
    * when path is not exist (via url or refresh), fallback have TRUE value then show loading.. then show page
    * when path is not exist (via <Link>), fallback have FALSE value then NOT show loading.. then show page
    * */
    return {
        paths,
        fallback: true,
    };
}