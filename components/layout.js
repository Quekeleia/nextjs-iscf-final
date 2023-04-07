import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Accelerometer';
const name2 = 'Acceleration Graphs';
export const siteTitle = 'Accelerometer web app';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/logo.png"
              className={utilStyles.borderCircle}
              height={100}
              width={200}
              alt=""
              
            />
            <br></br>
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <section style={{ display: "flex", justifyContent: "center" }}>
              <Link href={"/"}>
                <Image
                  priority
                  src="/images/logo.png"
                  className={utilStyles.borderCircle3}
                  height={100}
                  width={200}
                  alt=""
                
                />
              </Link>
            </section>
            <br></br>
            <section style={{ display: "flex", justifyContent: "center" }}>
              <Link href="/">
                <Image
                  priority
                  src="/images/robot3.png"
                  className={utilStyles.borderCircle4}
                  height={108}
                  width={108}
                  alt=""
                />
              </Link>
            </section>
            <section style={{ display: "flex", justifyContent: "center" }}>
              <h2 className={utilStyles.headingLg}>
                <Link href="/" className={utilStyles.colorInherit}>
                  {name2}
                </Link>
              </h2>
            </section>
            
          </>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
}