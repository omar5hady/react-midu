import { useEffect, useState } from "react";
import "./App.css";

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";
const CAT_ENDPOINT_IMAGE_URL = "https://cataas.com/cat/says/";

const App = () => {
  const [fact, setFact] = useState("hecho1");
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const { fact } = data;
        setFact(fact);
      });
  }, []);

  //Efect para recuperar la imagen
  useEffect(() => {
    if (!fact) return;
    const firstWord = fact.split(" ", 3).join(" ");

    fetch(`${CAT_ENDPOINT_IMAGE_URL}${firstWord}?size=50&color=red&json=true`)
      .then((res) => res.json())
      .then((data) => {
        const { url } = data;
        setImageURL(url);
      });
  }, [fact]);

  return (
    <main>
      <h1>App de gatitos</h1>
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
