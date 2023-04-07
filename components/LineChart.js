import React from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto';

function LineChart ({ chartData }){
    
    const Graphoptions={
        elements: {
            line: {
              tension: 0,
              borderWidth: 2,
              borderColor: "wheat",
              backgroundColor: "wheat",
            },
            point: {
              radius: 3,
              hitradius: 10,
              borderColor: "gray",
              backgroundColor:"wheat",
            },
          }, 
        
        scales: {
            x: {
              grid: {
                color: "gray",
              },
              display: true,
              ticks: {
                color: "white",
              },
            },
            y: {
              grid: {
                color: "gray",
              },
              display: true,
              ticks: {
                color: "white",
              },
            },
          },
    }

    return <Line data = {chartData}
            options={Graphoptions}/>;    
}

export default LineChart;