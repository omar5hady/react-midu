
import { Container, Stack, Typography } from '@mui/material';
import './App.css'
import JavaScriptLogo from './components/JavaScriptLogo';
import Start from './Start';
import { useQuestionStore } from './store/questions';
import Game from './Game';
import Footer from './Footer';

function App() {
  const questions = useQuestionStore(state => state.questions)
  console.log(questions);
  return (
    <main>
      <Container maxWidth="sm">
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <JavaScriptLogo />
          <Typography variant='h2' component='h1'>
            Javascript Quiz
          </Typography>
        </Stack>
        { questions.length === 0 && <Start /> }
        { questions.length > 0 && 
        <>
          <Game/>
          <Footer/>
        </>
        }
      </Container>
    </main>
  )
}

export default App
