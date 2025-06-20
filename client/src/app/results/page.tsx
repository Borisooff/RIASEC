'use client'

import {useEffect, useState} from "react";
import {getResults} from "@/lib/api";
import PieChart from "@/components/PieChart";
import {ResultInterface} from "@/interfaces/ResultInterface";
import {RIASEC_DESCRIPTIONS} from "@/lib/data";


const Results = () => {
    const [results, setResults] = useState<ResultInterface>({
        R: 0,
        I: 0,
        A: 0,
        S: 0,
        E: 0,
        C: 0,
    });

    useEffect(() => {
        const fetchResults = async () => {
            const results: ResultInterface = await getResults();
            setResults(results);
        };
        fetchResults();
    }, []);

    const topCategory = Object.entries(results).reduce((max, entry) => {
        return entry[1] > max[1] ? entry : max;
    }, ["", 0])[0];

    return (
        <main className="text-white px-4 py-8 max-w-3xl mx-auto">
            <h1 className="text-center text-[50px] mb-10">Результаты</h1>
            {results && <PieChart dataObject={results} />}
            {topCategory && (
                <div
                    className="mt-10 text-base leading-relaxed text-black bg-white p-5 radius"
                    dangerouslySetInnerHTML={{__html: RIASEC_DESCRIPTIONS[topCategory]}}
                />
            )}
        </main>
    );
};

export default Results;
