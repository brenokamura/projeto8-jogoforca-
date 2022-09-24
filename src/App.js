import React from "react"

export default function App() {
  const alfabeto = ["a", "á","ã","b", "c","ç", "d", "e", "é", "f", "g", "h", "i", "í", "j", "k", "l", "m", "n", "o","ó","õ", "p", "q", "r", "s", "t", "u","ú", "v", "w", "x", "y", "z"]
  return (
    <div className="corpo">
      <div className="topo">
        <div className="forca-imagem">
          <img src="assets/forca0.png" />
        </div>
        <div className="botao" >
          Escolher Palavra
        </div>
      </div>
      <div className="teclado">
        
          {alfabeto.map((a, i) => (
            <div className="letters" key={i}>
              <button>
                {a.toUpperCase()}
              </button>
            </div>
          ))}
        
      </div>
      <footer className="chute">
        <h1>Já sei a palavra!</h1>
        <input type="text" />
        <button className="botaoChutar">Chutar</button>
      </footer>
    </div>
  )
}


