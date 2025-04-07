import { useEffect, useState } from "react";

const CAT_ENDPOINT_IMAGE_URL = "https://cataas.com/cat/says/";

export const useCatImage = ({ fact }) => {
  const [imageURL, setImageURL] = useState(null);

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

  return { imageURL }
};