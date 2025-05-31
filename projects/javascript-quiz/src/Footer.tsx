import { Button } from "@mui/material";
import { useQuestionsData } from "./hooks/useQuestionsData";


const Footer = () => {
    const { reset, correcto, incorrecto, unanswered }  = useQuestionsData();

    const handleReset = () => {
        reset();
    }

    return (
        <footer style={{ marginTop: '16px' }}>
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#222', color: '#fff' }}>
                <h3>Resultados del Quiz</h3>
                <p> ✅ Correctas: {correcto}</p>
                <p> ❌ Incorrectas: {incorrecto}</p>
                <p>Preguntas Sin Responder: {unanswered}</p>
                <Button variant="outlined" onClick={() => handleReset()}> Resetear Juego</Button>
            </div>
        </footer>
    );
}

export default Footer;
