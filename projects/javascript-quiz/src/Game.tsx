import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { useQuestionStore } from "./store/questions";
import type { Question as QuestionType } from "./types";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { paraisoDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const getBackgroundColor = (info: QuestionType, index: number) => {
    const { userSelectedAnswer, correctAnswer } = info;

    //usuario no ha seleccionado una respuesta
    if (userSelectedAnswer == null) return 'transparent'; // Default background color
    //Si ya selecciono una respuesta y es incorrecta
    if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent';
    //Si selecciono una respuesta correcta
    if (index === correctAnswer) return '#4caf50'; // Green for correct answer
    //Si selecciono una respuesta incorrecta
    if (index === userSelectedAnswer && userSelectedAnswer !== correctAnswer) return '#f44336'; // Red for incorrect answer
    return 'transparent'; // Default background color

}

const Question = ({ info }: { info: QuestionType }) => {
    const selectAnswer = useQuestionStore(state => state.selectAnswer);

    const handleAnswerSelect = (answerIndex: number) => () => {
        if (selectAnswer && info.id !== undefined) {
            selectAnswer(info.id, answerIndex);
        }
    }

    return (
        <Card sx={{ padding: 2, textAlign: 'left', bgcolor: '#222' }} variant="outlined">
            <Typography variant="h5" component="h2" gutterBottom>
                {info.question}
            </Typography>
            <SyntaxHighlighter language="javascript" style={paraisoDark}>
                {info.code}
            </SyntaxHighlighter>
            <List sx={{ bgcolor: '#333' }} disablePadding>
                {info.answers.map((option, index) => (
                    <ListItem key={index} disablePadding divider>
                        <ListItemButton disabled={info.userSelectedAnswer != null}
                            onClick={handleAnswerSelect(index)}
                            sx={{ backgroundColor: getBackgroundColor(info, index), textAlign: 'center', color: '#fff' }
                            }
                        >
                            <ListItemText primary={option} sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Card>
    );
}

const Game = () => {
    const questions = useQuestionStore(state => state.questions);
    const currentQuestion = useQuestionStore(state => state.currentQuestion);
    const goNextQuestion = useQuestionStore(state => state.goNextQuestion);
    const goPreviousQuestion = useQuestionStore(state => state.goPreviousQuestion);

    const questionInfo = questions[currentQuestion];
    return (
        <div>
            <Stack direction="row" gap={2} alignItems='center' justifyContent="center" sx={{ marginBottom: 2 }}>
                <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
                    <ArrowBackIos /><span>Anterior</span>
                </IconButton>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    {currentQuestion + 1} / {questions.length}
                </Typography>

                <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
                    <span>Siguiente</span> <ArrowForwardIos />
                </IconButton>
            </Stack>
            <Question info={questionInfo} />
        </div>
    );
}

export default Game;
