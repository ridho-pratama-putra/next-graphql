import Head from 'next/head'
import styles from '../styles/Home.module.css';
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <Link href="/post/first-post" className={styles.card}>
            <h3>First Post &rarr;</h3>
            <p>First post using different component.</p>
          </Link>
          <Link href="/post/second-post" className={styles.card}>
            <h3>Second Post &rarr;</h3>
            <p>Second post using different component.</p>
          </Link>
            <Link href="/post/third-post" className={styles.card}>
                <h3>dynamic routes Post 3 &rarr;</h3>
                <p>berita-terkini</p>
            </Link>
            <Link href="/post/fourth-post" className={styles.card}>
                <h3>dynamic routes Post 4 &rarr;</h3>
                <p>berita-kriminal</p>
            </Link>
            <Link href="/post/fifth-post" className={styles.card}>
                <h3>dynamic routes Post 5 &rarr;</h3>
                <p>dynamic routes post using different component.</p>
            </Link>
            <Link href="/post/sicth-post" className={styles.card}>
                <h3>dynamic routes Post xxxx &rarr;</h3>
                <p>dynamic routes post using different component.</p>
            </Link>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}