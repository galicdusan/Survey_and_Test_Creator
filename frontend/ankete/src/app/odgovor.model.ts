export interface Odgovor{
    id_test: number,
    user: string,
    points: number,
    zakljucan: number,
    answers: {
        id_question: number,
        answer: [string]
    }[]
}