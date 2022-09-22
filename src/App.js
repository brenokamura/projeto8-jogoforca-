
export default function App() {
  return (
    <div className="corpo">
      <div className="topo">
        <div className="forca-imagem">
          <img src="assets/forca0.png" />
        </div>
        <div className="botao">
          Escolher Palavra
        </div>
      </div>
      <div className="teclado">Alfabeto</div>
      <footer className="chute">
        <h1>Já sei a palavra!</h1>
        <input type="text" />
        <button className="botaoChutar">Chutar</button>
      </footer>
    </div>
  )
}