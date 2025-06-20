import {QuestionInterface} from "@/interfaces/QuestionInterface";

let sessionId: string;

export async function initSession(): Promise<void> {
    const existing = localStorage.getItem('quiz_session_id');
    if (existing) {
        sessionId = existing;
    } else {
        const response = await fetch('http://127.0.0.1:8000/new-session');
        const data: { session_id: string } = await response.json();
        localStorage.setItem('quiz_session_id', data.session_id);
        sessionId = data.session_id;
    }
}

export async function getAllQuestions(): Promise<QuestionInterface[]> {

    const response = await fetch('http://127.0.0.1:8000/questions');
    if (!response.ok) {
        throw new Error("Ошибка при получении вопросов");
    }
    return await response.json();
}

export async function getQuestionById(id: number): Promise<QuestionInterface | undefined> {

    const questions: QuestionInterface[] = await getAllQuestions();

    const response: QuestionInterface | undefined = questions.find(q => q.id === id);

    if (!response) {
        throw new Error(`Ошибка при получении вопроса c id ${id}`);
    }
    return response;
}

export async function getQuestionsCount(): Promise<number> {
    const questions: QuestionInterface[] = await getAllQuestions();
    if (!questions) {
        throw new Error(`Ошибка при получении вопросов`);
    }

    return questions.length + 1;
}

export async function sendAnswer(questionId: number, optionId: number): Promise<void> {
    if (!sessionId) {
        await initSession();
    }

    console.log(sessionId, questionId, optionId)

    await fetch(`http://127.0.0.1:8000/answer?session_id=${sessionId}&question_id=${questionId}&option_id=${optionId}`, {
        method: 'POST',
    });
}

export async function getResults() {
    const response = await fetch(`http://127.0.0.1:8000/results?session_id=${sessionId}`)
    if (!response.ok) {
        throw new Error("Ошибка при получении результатов");
    }
    return await response.json();
}