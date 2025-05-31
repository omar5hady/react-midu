import { useQuestionStore } from "../store/questions";

export const useQuestionsData = () => {
    const questions = useQuestionStore(state => state.questions);
    const reset = useQuestionStore(state => state.reset);
    let correcto = 0;
    let incorrecto = 0;
    let unanswered = 0;
    questions.forEach(question => {
        if (question.userSelectedAnswer !== undefined) {
            if (question.isCorrectUserAnswer) {
                correcto++;
            } else {
                incorrecto++;
            }
        } else {
            unanswered++;
        }
    });

    return {
        correcto,
        incorrecto,
        unanswered,
        reset
    };
}