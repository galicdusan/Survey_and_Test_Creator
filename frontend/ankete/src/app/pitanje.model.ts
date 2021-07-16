export interface Pitanje{
    id: number,
    question: string,
    type: string,
    numberAnswers: string,
    obavezan: number,
    answers : [string],
    correct : [string]
}