import {JSX} from "react";
import {CardProps} from "@/components/Card/Card.props";
import {twMerge} from "tailwind-merge";
import Button from "@/components/UI/Button/Button";
import {AnswersInterface} from "@/interfaces/AnswersInterface";
import {sendAnswer} from "@/lib/api";

const Card = ({question, index, answers, total, className, nextFunction, ...props}: CardProps): JSX.Element => {

    const progress = (index / total) * 100;

    const  handleChoose = async (optionId:number) =>{
        await sendAnswer(index, optionId)
        nextFunction()
    }



    return (
        <div className={
            twMerge(
                className,
                "bg-[var(--white)] shadow max-w-[1200px] w-full mx-auto  radius py-[50px] lg:px-[150px] px-[30px] h-fit text-center",
            )
        } {...props}>
            <p className="mb-[10px]">
                Вопрос {index}\{total}
            </p>
            <div className="progress-bar h-[15px] w-full bg-[#D9D9D9] rounded-[2px] overflow-hidden">
                <div style={{width: progress + '%'}} className='bg-[#1980D8] h-full'></div>
            </div>
            <h2 className='text-[20px] xl:text-[50px] py-2'>{question}</h2>
            {answers.map((answer: AnswersInterface, i: number): JSX.Element => {
                return (
                    <div key={i} className='bg-[#F4F4F4] radius shadow mb-[30px] px-[20px] py-[15px] text-left cursor-pointer' onClick={() => handleChoose(answer.id)}>
                        {answer.text}
                    </div>
                )
            })}
        </div>
    )
}

export default Card;