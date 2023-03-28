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
          <section style={{display:"flex",justifyContent:"center"}}>
            Press on the "Charts" button to view the chart created for the accelerometer, otherwise press the "Warnings" buttons to see all available
      </section>

      <section style={{display:"flex",justifyContent:"center"}}>
          <Image
            priority
            src="/images/coppelia.png"
            className={utilStyles.borderCircle2}
            height={200}
            width={200}
            alt=""/>
      </section>

        
        <section style={{display:"flex",justifyContent:"center"}}>

        <Link href="/posts/first-post">
          <button className={buttonStyles.buttonbox}> Charts</button>
        </Link>

        <Link href="/login">
          <button className={buttonStyles.buttonbox}> Login </button>
        </Link>
      </section> 
      
      


      
      </section>
      <div className="footer">
        <p>António Malato 55243 e Tomás Vasques 55950</p>
      </div>
      <style jsx>{`
        .footer {
          position: absolute;
          bottom: 0;
          width: 98%;
          height: 30px;
          background-color: darkgrey;
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