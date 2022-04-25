import React from 'react';
import '../styles/component/_GraphWeightPerHour.scss'
import ReactApexChart from "react-apexcharts";


const GraphWeightPerHour = () => {

    const state = {

        series: [{
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
        },],
        options: {
            chart: {
                height: 350,
            },
            dataLabels: {
                enabled: false
            },

            xaxis: {
                categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        },
    }
    return (
        <div id="chart">
            <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
        </div>
    );
};





export default GraphWeightPerHour;