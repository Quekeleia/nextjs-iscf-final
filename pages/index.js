import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import buttonStyles from '../styles/button.module.css';
import Image from 'next/image'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <section style={{ display: "flex", justifyContent: "center" }}>
          <p> 
            ISCF Labwork 1
          </p>
        </section>

        <br></br><br></br>

        <section style={{ display: "flex", justifyContent: "center" }}>
          <Image
            priority
            src="/images/robot3.png"
            className={utilStyles.borderCircle1}
            height={200}
            width={200}
            alt="" />
        </section>
        <br></br><br></br>


        <section style={{ display: "flex", justifyContent: "center" }}>

          <Link href="/login">
            <button className={buttonStyles.buttonbox}> Login </button>
          </Link>


        </section>
      </section>

      <div className="footer">
        <p> Project developed by : António Malato 55243 & Tomás Vasques 55950</p>
      </div>
      <style jsx>{`
        .footer {
          position: absolute;
          text-decoration: overline;
          bottom: 0;
          width: 100%;
          height: 30px;
          color: wheat;
          background-color: rgb(32, 32, 32);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        p {
          margin: 0;
        }
      `}</style>
    </Layout>
  );
} 