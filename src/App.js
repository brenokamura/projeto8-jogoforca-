import { useState } from "react"
import palavras from "./palavras"

export default function App() {
  const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

  const [letras, setLetras] = useState([])
  const [palavra, setPalavra] = useState([])
  const [adivinharPalavra, setAdivinharPalavra] = useState([])
  const [campoPalavra, setCampoPalavra] = useState([])
  const [erros, setErros] = useState(0)
  const [imagemForca, setImagemForca] = useState("assets/forca0.png")
  const [jogo, setJogo] = useState("iniciando")


  function aleatorio() {
    return (Math.random() - 0.5)
  }

  function escolhaPalavra() {
    palavras.sort(aleatorio)
    setPalavra(palavras[0].split(""))
    let sublinhado = "_".repeat(palavras[0].length)
    console.log(palavras[0])
    setAdivinharPalavra(sublinhado.split(""))
    comecarJogo()
  }

  function comecarJogo() {
    setCampoPalavra("")
    setErros(0)
    setImagemForca(`assets/forca0.png`)
    setJogo("jogando")
    setLetras([])
  }

  function adivinhaLetra(event, index) {
    setLetras([...letras, index])
    let letra = event.target.textContent
    if (palavra.includes(letra)) {
      const atualizaAdivinhaLetra = palavra.map((l, index) => compara(l, letra) ? l : adivinharPalavra[index])
      setAdivinharPalavra(atualizaAdivinhaLetra)
      verficaGanhou(atualizaAdivinhaLetra)
    } else {
      let atualizaErrosForca = erros + 1
      setErros(atualizaErrosForca)
      setImagemForca(`assets/forca${atualizaErrosForca}.png`)
      verficaDerrota(atualizaErrosForca)
    }

  }

  function compara(str1, str2) {
    return str1.localeCompare(str2, undefined, { sensitivity: "base" }) === 0
  }

  function adivinhaPalavra(atualizaAdivinhaLetra) {
    if (!verficaGanhou(atualizaAdivinhaLetra)) {
      setErros(6)
      setImagemForca(`assets/forca6.png`)
      verficaDerrota(6)
    }

  }

  function verficaGanhou(atualizaAdivinhaLetra) {
    let wordStr = palavra.join("")
    let guessWordStr = atualizaAdivinhaLetra.join("")
    if (compara(wordStr, guessWordStr)) {
      setAdivinharPalavra(atualizaAdivinhaLetra)
      setJogo("ganhei")
      console.log(wordStr)
      return true
    }
    return false
  }

  function verficaDerrota(atualizaErrosForca) {
    if (atualizaErrosForca === 6) {
      setAdivinharPalavra(palavra)
      setJogo("derrota")
    }

  }

  return (
    <div className="corpo">
      <div className="topo">
        <div className="forca-imagem">
          <img src={imagemForca} />
        </div>
        <div className="botao">
          <button lassName="botao-escolha"onClick={() => escolhaPalavra()}>Escolher Palavra</button>
          <div className="palavraEscolhida">
            {adivinharPalavra.map((letra) => <span className={jogo}>{letra}</span>)}
          </div>
        </div>
      </div>
      <div className="teclado">
        {alfabeto.map((letter, index) => <button key={index} className="letra" disabled={jogo === "jogando" ? letras.includes(index) : true} onClick={event => adivinhaLetra(event, index)}>{letter}</button>)}
      </div>
      <div className="footer">
        <label >Já sei a palavra!</label>
        <input type="text" value={campoPalavra} disabled={!(jogo === "jogando")} onChange={(event) => setCampoPalavra(event.target.value)}></input>
        <button disabled={!(jogo === "jogando")} onClick={() => adivinhaPalavra(campoPalavra.split(""))}>Chutar</button>
      </div>
    </div>
  )
}