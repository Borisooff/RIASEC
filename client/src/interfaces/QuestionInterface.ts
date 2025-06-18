export interface QuestionInterface {
    question: string;
    category: 'Realistic' | 'Investigative' | 'Artistic' | 'Social' | 'Enterprising' | 'Conventional';
    id: number;
}