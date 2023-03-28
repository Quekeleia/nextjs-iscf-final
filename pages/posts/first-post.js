import Link from 'next/link';
import Head from 'next/head';
import LineChart from '/components/LineChart'
import buttonStyles from '/styles/button.module.css';
import {useSession, signOut} from 'next-auth/react'
import React from 'react'
import { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, onValue} from "firebase/database";
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

    const{  data: session, status } = useSession({required:true})

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

    const [intervalId,setIntervalId] = useState(null);
    const [num_Refresh,setRefreshnum] = useState(0);
    const [finalNumRefr,setRefreshnumFin] = useState(0);

    const handleChange = (e) => {
      setRefreshnum(e.target.value); //Apenas vai buscar ao input
    };
    
    const handleSubmit = (e) => { // Só da setup ao numero quando se da submit
      e.preventDefault(); // Previne o reload da pagina
      setRefreshnumFin(num_Refresh); // Guarda o valor final na variavel para utilizar, e usa ao dar handle submit
    };


    useEffect(() => { // Hook permite correr as cenas em paralelo com a frontend, ou seja atualizar os dados na backend e enviar para a front
     
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);

      const refAccel = ref(database, 'Accel');

      function refresh_rate(){ //Lê e atualiza o gráfico uma vez
        
           
        
          
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
            
            
            const id = setInterval(refresh_rate,finalNumRefr); //Quando usamos a função guardamos o id para depois dar clear (previne memory leaks)
            setIntervalId(id);
              return () =>  {
                clearInterval(intervalId); // cada vez que ele corre este on effect ele analisa o ultimo falor de num_Refresh por isso podemos limpar
                };
        
    }, []); 



if(status === "authenticated"){
return (
    <>
        <Head> 
            
            <title>Accelaration Graphs</title>

        
        </Head>

        
        <section style={{display:"flex",justifyContent:"center"}}>
          <h1>Accelaration Graphs</h1>
        </section>

        <section style={{display:"flex",justifyContent:"center"}}>
        
          <form onSubmit={handleSubmit}>
            <label> Enter the Refresh Rate in miliseconds: </label>
            <input type="number" id="R_Freq" 
           name="R_freq" min="0" max="10000" value={num_Refresh} onChange={handleChange} />
            <button className={buttonStyles.buttonbox2}  >Submit</button>   
          </form>

        </section>
        
        <section style={{display:"flex",justifyContent:"center"}}>
        <div style ={{width: 900 }}>
        <LineChart chartData = {dataFromDatabase}/>
        </div>
        </section>

        <section style={{display:"flex",justifyContent:"center"}}>
        <div style ={{width: 900 }}>
        <LineChart chartData = {dataFromDatabaseY}/>
        </div>
        </section>

        <section style={{display:"flex",justifyContent:"center"}}>
        <div style ={{width: 900 }}>
        <LineChart chartData = {dataFromDatabaseZ}/>
        </div>
        </section>
        
        

        <section style={{display:"flex",justifyContent:"center"}}>
            <Link href="/">
                <button className={buttonStyles.buttonbox}> Back to main page </button>
            </Link>
        </section>

        <div className="footer">
        <p>António Malato 55243 e Tomás Vasques 55950</p>
      </div>
      <style jsx>{`
        .footer {
          position: relative;
          bottom: 0;
          width: 100%;
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
    </>
);
} else {

  return(

    <div>
       <p>You are not signed in</p> 
    </div>

)

}


}


