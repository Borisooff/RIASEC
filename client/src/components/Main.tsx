import Card from "@/components/Card/Card";
import {getAllQuestions} from "@/lib/db";
import {QuestionInterface} from "@/interfaces/QuestionInterface";
import {JSX} from "react";
import {AnswersInterface} from "@/interfaces/AnswersInterface";



export default async function Main() {

    const questions: QuestionInterface[] = await getAllQuestions();

    const answers: AnswersInterface[] = [
        {
            title: 'Совершенно верно',
            score: 4
        },
        {
            title: 'Верно',
            score: 3
        },
        {
            title: 'Скорее не так',
            score: 2
        },
        {
            title: 'Нет, это не так',
            score: 1
        }
    ]

    return (
        <main className='flex items-center justify-center min-h-[90vh]'>
            {questions.map((question: QuestionInterface, index: number): JSX.Element => (
                    <Card question={question.question} answers={answers} total={questions.length + 1} index={index + 1}
                          key={index}/>
                )
            )}
        </main>
    );
}
