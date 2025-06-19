import {DetailsHTMLAttributes} from "react";
import {AnswersInterface} from "@/interfaces/AnswersInterface";

export interface CardProps extends DetailsHTMLAttributes<HTMLDivElement> {
    question: string;
    answers: AnswersInterface[];
    index: number;
    total: number;
}