import Link from 'next/link';
import Head from 'next/head';
import LineChart from '/components/LineChart'
import buttonStyles from '/styles/button.module.css';
import { useSession, signOut } from 'next-auth/react'
import React from 'react'
import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, onValue } from "firebase/database";
import utilStyles from '/styles/utils.module.css';
import Layout, { siteTitle } from '/components/layout';
import { Colors } from 'chart.js';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAupTh2HQhNBMc2h4JWhUJFoBaX_LM48ww",
  authDomain: "iscf-d719b.firebaseapp.com",
  databaseURL: "https://iscf-d719b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "iscf-d719b",
  storageBucket: "iscf-d719b.appspot.com",
  messagingSenderId: "503470755555",
  appId: "1:503470755555:web:6ae8ff35d01fa1ba34ffd6",
  measurementId: "G-55BZB2FRYZ"
};




export default function FirstPost(){

    const{  data: status } = useSession({required:true})

    const [dataFromDatabase, setDataX] = useState({ //Inicializar em vazio a estrutura 
        labels: [] ,
        datasets: [{
            label: "Acceleration in the X Axis",
            data: [],

        }]
    });

    const [dataFromDatabaseY, setDataY] = useState({ //Inicializar em vazio a estrutura 
        labels: [] ,
        datasets: [{
            label: "Acceleration in the Y Axis",
            data: [],

        }]
    });

    const [dataFromDatabaseZ, setDataZ] = useState({ //Inicializar em vazio a estrutura 
        labels: [] ,
        datasets: [{
            label: "Acceleration in the Z Axis",
            data: [],

        }]
    });
    
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };

    const [num_Refresh,setRefreshnum] = useState(0);
    const [finalNumRefr,setRefreshnumFin] = useState(0);

    const handleChange = (e) => {
      setRefreshnum(e.target.value); //Apenas vai buscar ao input
    };
    
    const handleSubmit = (e) => { // Só da setup ao numero quando se da submit
      e.preventDefault(); // Previne o reload da pagina
      setRefreshnumFin(num_Refresh); // Guarda o valor final na variavel para utilizar, e usa ao dar handle submit
    };

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    function get_data(database){ //Lê e atualiza o gráfico uma vez
        

          const refAccel = ref(database, 'Accel');

          get(refAccel).then( (snapshot) => { // Faço get para ir so buscar uma vez, e dou setTimeout no final para ele realizar esta funcionalidade de x em x tempo

            const data_FB = snapshot.val();
            const dataArray = Object.entries(data_FB).map(([key, value]) => ({...value, id: key})); // convert to an array of objects (Vinha em dicionario e nao conseguia usar o map)
           
            const test_time = dataArray.map((d_chart) => (new Date(d_chart.timestamp * 1000)).toLocaleString('en-US',options)); // Ir buscar o objeto date
              
                

                const newDataX = { //Por cada conjunto de data que entre eu coloco no vetor de labels valores para o tempo e nos datasets vals de accel
                  labels: test_time,
                  datasets: [{
                    label: "Acceleration in the X Axis",
                    data: dataArray.map((d_chart) => d_chart.x),
                  }]
                }; 

                const newDataY = { //Por cada conjunto de data que entre eu coloco no vetor de labels valores para o tempo e nos datasets vals de accel
                  labels: test_time,
                  datasets: [{
                    label: "Acceleration in the Y Axis",
                    data: dataArray.map((d_chart) => d_chart.y),
                  }]
                };

                const newDataZ = { //Por cada conjunto de data que entre eu coloco no vetor de labels valores para o tempo e nos datasets vals de accel
                  labels: test_time,
                  datasets: [{
                    label: "Acceleration in the Z Axis",
                    data: dataArray.map((d_chart) => d_chart.z),
                  }]
                };
                
                
                setDataX(newDataX);
                setDataY(newDataY);
                setDataZ(newDataZ);
                
              });
            }
    

    useEffect(() => { // Hook permite correr as cenas em paralelo com a frontend, ou seja atualizar os dados na backend e enviar para a front
     
      
     
      const id = setInterval(() => 
      {

        get_data(database);
      
      } , finalNumRefr); //Quando usamos a função guardamos o id para depois dar clear (previne memory leaks)

      

      return () =>  clearInterval(id); // cada vez que ele corre este on effect ele analisa o ultimo falor de num_Refresh por isso podemos limpar

        
    }, [finalNumRefr]); //Para limpar a variável quando voltar a correr

      


  return (
    <Layout>
      <Head>
        <title>Acceleration Graphs</title>
      </Head>

      <section style={{ display: "flex", justifyContent: "center" }}>

        <form onSubmit={handleSubmit}>
          <section className={utilStyles.headingMd}>
            <label> Enter the Refresh Rate in miliseconds: </label>
            <input type="number" id="R_Freq"
              name="R_freq" min="0" max="10000" value={num_Refresh} onChange={handleChange} />
            <button className={buttonStyles.buttonbox2}  >Submit</button>
          </section>
          </form>

      </section>

      <section style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 900 }}>
          <LineChart chartData={dataFromDatabase}/>
        </div>
      </section>

      <section style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 900 }}>
          <LineChart chartData={dataFromDatabaseY} />
        </div>
      </section>

      <section style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 900 }}>
          <LineChart chartData={dataFromDatabaseZ} />
        </div>
      </section>



      <section style={{ display: "flex", justifyContent: "center" }}>


        <Link href="/login">
          <button className={buttonStyles.buttonbox}> Back to Welcome page </button>
        </Link>



        <Link href="/">
          <button className={buttonStyles.buttonbox}> Back to Home </button>
        </Link>




      </section>

      <div className="footer">
        <p>Project developed by : António Malato 55243 & Tomás Vasques 55950</p>
      </div>
      <style jsx>{`
        .footer {
          position: relative;
          bottom: -110px;
          text-decoration: overline;
          width: 100%;
          height: 30px;
          background-color: rgb(32, 32, 32);
          color: wheat;
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