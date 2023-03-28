import Link from 'next/link';
import Head from 'next/head';  
import Script from 'next/script';
import buttonStyles from '/styles/button.module.css';
import Layout from '../../components/layout';
import utilStyles from '/styles/utils.module.css';
import dynamic from 'next/dynamic'

//WARNINGS COMPONENTE EXTRA
export default function Charts() {
    return (
      <>
        <Head>
          <title>Charts</title>
        </Head>
        <section style={{display:"flex",justifyContent:"center"}}>
            <h1>Charts</h1>
        </section>

        Nesta página encontram-se os gráficos
        <section style={{display:"flex",justifyContent:"center"}}>
         
            <form>
            <label for="last">Refresh Rate:</label>
            <input type="text" id="vel" name="vel" />
            <button className={buttonStyles.buttonbox2}  >Submit</button>
            </form>
        </section>
        

        <section style={{display:"flex",justifyContent:"center"}}>
            <Link href="/">
                <button className={buttonStyles.buttonbox}> Back to main page </button>
            </Link>
        </section>
      </>
    );
  }