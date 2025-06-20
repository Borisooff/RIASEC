import {AnswersInterface} from "@/interfaces/AnswersInterface";

export interface QuestionInterface {
    text: string;
    category: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
    id: number;
    options: AnswersInterface[]
}