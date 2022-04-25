import React from 'react';
import '../styles/component/_StatCollectAdmin.scss'
import '../Data/Data'
import ReactApexChart from "react-apexcharts";

const StatCollectAdmin = () => {

    const state = {

        series: [{
            name: 'Bio-déchet',
            data: [44, 55, 41, 67, 22, 43]
        }, {
            name: 'Marc de café',
            data: [13, 23, 20, 8, 13, 27]
        }, {
            name: 'Huile',
            data: [11, 17, 15, 15, 21, 14]
        }, ],
        options: {
            chart: {
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }],
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 10
                },
            },
            xaxis: {
                categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
                    '01/05/2011 GMT', '01/06/2011 GMT'
                ],
            },
            fill: {
                opacity: 1
            }
        },


    };

    return (

        <div className="chart">
            <h4>Statistique de collecte</h4>
            <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
        </div>
    );
};

export default StatCollectAdmin;