import { create } from "zustand";
import { type Question } from "../types";
import confetti from "canvas-confetti";
import { persist } from "zustand/middleware";


interface State {
    questions: Question[];
    currentQuestion: number;
    fetchQuestions: (limit: number) => Promise<void>
    selectAnswer?: (questionId: number, answerIndex: number) => void;
    goNextQuestion: () => void;
    goPreviousQuestion: () => void;
    reset: () => void;
}

export const useQuestionStore = create<State>()(persist(
    (set, get) => {
        return {
            questions: [],
            currentQuestion: 0,

            fetchQuestions: async (limit: number) => {
                const res = await fetch('http://localhost:5173/data.json')
                const json = await res.json()

                const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
                set({ questions })
            },
            selectAnswer: (questionId: number, answerIndex: number) => {
                const { questions } = get();
                //Usar el structuredClone para evitar mutaciones directas
                const newQuestions = structuredClone(questions);
                //questionIndex de la pregunta actual
                const questionIndex = newQuestions.findIndex((q: Question) => q.id === questionId);
                const questionInfo = newQuestions[questionIndex];

                const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
                if (isCorrectUserAnswer) {
                    //Si la respuesta es correcta, mostrar confetti
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
                //Cambiar esta informacion en la copia de la pregunta
                newQuestions[questionIndex] = {
                    ...questionInfo,
                    userSelectedAnswer: answerIndex,
                    isCorrectUserAnswer
                };
                set({ questions: newQuestions });
                //Si es la ultima pregunta, reiniciar el contador
            },
            goNextQuestion: () => {
                const { currentQuestion, questions } = get();
                const nextQuestion = currentQuestion + 1;
                if (nextQuestion < questions.length) {
                    set({ currentQuestion: nextQuestion });
                }
            },
            goPreviousQuestion: () => {
                const { currentQuestion } = get();
                const previousQuestion = currentQuestion - 1;
                if (previousQuestion >= 0) {
                    set({ currentQuestion: previousQuestion });
                }
            },
            reset: () => {
                set({
                    questions: [],
                    currentQuestion: 0,
                });
            }
        }
    }, {
        name: 'questions-storage', // unique name for the storage
    }))