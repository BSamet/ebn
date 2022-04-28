import React from 'react';
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
                categories: ['04/09/2022 ', '05/09/2022 ', '06/09/2022 ', '07/09/2022 ',
                    '08/09/2022 ', '09/09/2022 '
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