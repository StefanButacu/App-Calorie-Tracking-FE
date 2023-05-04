import React, {useEffect, useState} from 'react';
import ReactApexChart from 'react-apexcharts';


interface CircleProps {
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
}

const Circle: React.FC<CircleProps> = ({protein, carbs, fats, calories}) => {
    const [chartOptions, setChartOptions] = useState<any>({});
    const [chartSeries, setChartSeries] = useState<any>([]);
    useEffect(() => {
        const options = {
            chart: {
                size: 100,
                animations: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            donut: {
                size: 200,
                background: '#f6f7fb',
                labels: {
                    show: false,
                },
            },
            series: [],
            labels: [],
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: false,
            },
            tooltip: {
                enabled: false,
            },
            colors: ['#1abc48', '#f39c12', '#e74c3c'],
            subtitle: {
                text: `${calories} Kcal`,
                align: 'center',
                offsetY: 50,
                floating:true,
                style: {
                    fontSize:  '12px',
                    fontWeight:  'normal',
                    fontFamily:  undefined,
                    color:  'black'
                },
            }
        };

        setChartOptions(options);
    }, [calories]);

    useEffect(() => {
        const total = protein + carbs + fats;
        const proteinPercentage = Math.floor(((protein / total) * 100));
        const carbohydratesPercentage = Math.floor(((carbs / total) * 100));
        const fatPercentage = Math.floor(((fats / total) * 100));
        const series = [proteinPercentage, carbohydratesPercentage, fatPercentage];
        setChartSeries(series);
    }, [protein, carbs, fats]);


    return (
        <div>
            <div style={{width: "180px", height: "100px"}}>
                <ReactApexChart options={chartOptions} series={chartSeries} type="donut"/>
            </div>
        </div>
    );
};

export default Circle;
