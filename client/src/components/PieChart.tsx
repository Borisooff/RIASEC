'use client'; // важно для Next.js App Router

import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import {ResultInterface} from "@/interfaces/ResultInterface";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    dataObject: ResultInterface;
}

export default function PieChart({ dataObject }: PieChartProps) {


    const typeLabels: Record<keyof ResultInterface, string> = {
        R: 'Realistic (Реалистичный)',
        I: 'Intellectual (Исследовательский)',
        A: 'Artistic (Артистичный)',
        S: 'Social (Социальный)',
        E: 'Enterprising (Предприимчивый)',
        C: 'Conventional (Традиционный)',
    };



    const labels = Object.keys(dataObject).map(key => typeLabels[key as keyof ResultInterface]);
    const values = Object.values(dataObject);

    const data = {
        labels,
        datasets: [
            {
                label: 'Баллы',
                data: values,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: 'white', // белый цвет текста легенды
                }
            },
            tooltip: {
                bodyColor: 'white', // цвет текста тултипа
                titleColor: 'white'
            }
        }
    };

    return <Pie className='max-w-[80vw] w-full max-h-[80vh] mx-auto text-white' data={data} options={options} />;
}
