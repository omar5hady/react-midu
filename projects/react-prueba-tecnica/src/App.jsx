import "./App.css";
import { useCatFact } from "./hooks/useCatFact";
import { useCatImage } from "./hooks/useCatImage";

const App = () => {
  const {fact, refreshRandomFact} = useCatFact()
  const {imageURL} = useCatImage({fact})

  const handleClick = async () => {
      refreshRandomFact()
  };

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>Get new fact</button>
      {/* <section> */}
      {fact && <p>{fact}</p>}
      {imageURL && (
        <img
          src={imageURL}
          alt={`Image extracted using the fist three words for ${fact}`}
        ></img>
      )}
      {/* </section> */}
    </main>
  );
};

export default App;
