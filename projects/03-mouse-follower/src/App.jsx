import { useEffect, useState } from "react";

function App() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState( { x: 0, y: 0} )

  //Efecto pointer move
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition( {x: clientX, y: clientY })
      console.log( 'handleMove', { clientX, clientY});
    }

    if(enabled)
      window.addEventListener('pointermove', handleMove)

    return() => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled]);

  //Efecto cambiar body class
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => (
      document.body.classList.remove('no-cursor')
    )
  }, [enabled])

  return (
    <main>
      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(0,0,0.5)",
          border: '1px, solid #fff',
          borderRadius: "50%",
          opacity: 0.8,
          pointerEvents: "none",
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      ></div>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Desactivar" : "Activar"} seguir puntero
      </button>
    </main>
  );
}

export default App;
