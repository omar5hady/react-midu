import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useStore } from "./hooks/useStore";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";
import { AUTO_LANGUAGE } from "./constants";
import { ArrowIcon, ClipboardIcon, SpeakerIcon } from "./components/Icons";
import LanguageSelector from "./components/LanguageSelector";
import { SectionType } from "./types.d";
import TextArea from "./components/TextArea";
import { useEffect } from "react";
import { translate } from "./services/translate";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const {
    fromLanguage,
    setFromLanguage,
    toLanguage,
    interchangeLanguage,
    setToLanguage,
    fromText,
    result,
    setFromText,
    setResult,
    loading
  } = useStore();

  const debouncedFromText = useDebounce(fromText, 300)

  useEffect(() => {
    if(debouncedFromText === '') return
    translate({fromLanguage, toLanguage, text: debouncedFromText})
      .then(result => {
        if( result == null ) return
        setResult(result)
      })
      .catch(() => setResult('Error'))
  }, [debouncedFromText, fromLanguage, toLanguage])

  const handleClipBoard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = toLanguage
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h2>Google Translate</h2>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              onChange={setFromText}
              type={SectionType.From}
              value={fromText}
            />
          </Stack>
        </Col>
        <Col xs="auto">
          <Button
            variant="link"
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguage}
          >
            <ArrowIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <div style={{ position: 'relative' }}>
              <TextArea
                loading={loading}
                onChange={setResult}
                type={SectionType.To}
                value={result}
              />
              <div style={{position: 'absolute', left: 0, bottom: 0, display: 'flex'}}>
                <Button variant='link' onClick={handleClipBoard}>
                  <ClipboardIcon/>
                </Button>

                <Button variant='link' onClick={handleSpeak}>
                  <SpeakerIcon/>
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
