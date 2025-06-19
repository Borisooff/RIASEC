import {QuestionInterface} from "@/interfaces/QuestionInterface";

export async function getAllQuestions():Promise<QuestionInterface[]> {
    return [
        {
            question: 'Мне нравится работать с инструментами',
            category: 'Realistic',
            id: 1
        },
        {
            question: 'Мне нравится проводить научные эксперименты',
            category: 'Investigative',
            id: 2
        },

    ];
}