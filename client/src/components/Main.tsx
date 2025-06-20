'use client'

import {useEffect, useState} from "react";
import {getQuestionById, getQuestionsCount} from "@/lib/api";
import Card from "@/components/Card/Card";
import {QuestionInterface} from "@/interfaces/QuestionInterface";
import {useRouter} from "next/navigation";

export default function Main() {
    const [question, setQuestion] = useState<QuestionInterface>();
    const [questIndex, setQuestIndex] = useState<number>(1);
    const [total, setTotal] = useState<number>(2);

    const router = useRouter();
    const fetchQuestion = async () => {
        const data = await getQuestionById(questIndex);
        setQuestion(data);
    };
    useEffect(() => {
        const fetchTotal = async () => {
            const total = await getQuestionsCount();
            setTotal(total);
        };
        fetchTotal();
        fetchQuestion()
    }, []);

    useEffect(() => {

        console.log(questIndex)
        if (questIndex < total) {
           fetchQuestion();
        } else {
            router.push('/results');
        }
    }, [questIndex, total]);


    return (
        <main className='flex items-center justify-center min-h-[90vh]'>
            {question &&
                <Card
                    question={question.text}
                    answers={question.options}
                    total={total}
                    index={questIndex}
                    nextFunction={() => setQuestIndex(prev => prev + 1)}
                />
            }
        </main>
    );
}
