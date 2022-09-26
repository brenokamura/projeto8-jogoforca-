import { useState } from "react"

export default function App() {
  const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
  const palavras = [
    "abacate", "abacaxi", "abelha", "abanador", "antologia", "amor", "aba", "abraço", "ábaco", "abrigo", "abrir", 
    "banana", "boi", "batata", "bacalhau", "bexiga", "bowl", "batedeira", "bisturi", "barreira", "banco", 
    "caixa", "chantilly", "comércio", "cachorro", "cuidado", "caneta", "carinho", "cupuaçu", "cabra", "cesto", 
    "dados", "dizer", "danone", "dente", "diário", "diamante", "diafragma", "detonar", "dia", "dromedário", 
    "elefante", "esmeralda", "espátula", "estômago", "esfinge", "esfera", "encontro", "ema", "escola", "economia", 
    "formiga", "fama", "festa", "fiador", "ferver", "flauta", "fichário", "figo", "fiapo", "fotografia", 
    "goiaba", "gelo", "grito", "gamão", "guria", "goleiro", "golfinho", "golfe", "girar", "glúten", 
    "helicóptero", "harmonia", "haste", "hectare", "hábito", "hepatite", "hiena", "hemisfério", "hidrante",
    "igreja", "ícone", "importante", "ímpar", "idoso", "irado", "identidade", "idioma", "idade", "idiota", 
    "jantar", "jumento", "jambú", "jibóia", "jararaca", "janela", "jerimum", "jaula", "jabuti", "jaleco", 
    "laranja", "lua", "leão", "limão", "larápio", "luz", "lindo", "lacraia", "lactose", "laço", "lacrar", 
    "mamão", "manga", "morango", "mico", "matar", "mingau", "moqueca", "macacão", "mocassin", "maçaneta", 
    "nectarina", "nada", "navio", "namorado", "ninja", "natal", "narciso", "narina", "nádega", "nabo", 
    "ovo", "ostra", "obstetra", "oblíquo", "orangotango", "olhar", "óculos", "ortodoxo", "ouro", "ornamento", 
    "pato", "polvo", "povoar", "pólvora", "palhaço", "paróqia", "pano", "princesa", "pizza", "patroa", 
    "queijo", "quitanda", "quinta", "quantia", "quarentena", "quadrilha", "quaresma", "quartzo", "quebrar", "quarteirão", 
    "risada", "rio", "remar", "rato", "racional", "rainha", "radioatividade", "raiz", "raiva", "rachadura", 
    "salada", "salamandra", "sacola", "siri", "sábado", "safanão", "sabre", "sucarose", "sabedoria", "sacerdote", 
    "tatu", "tabacaria", "taberneiro", "tábua", "torrada", "três", "terço", "tamanho", "tatuagem", "trem", 
    "uva", "uísque", "união", "universo", "unanimidade", "ubuntu", "universidade", "urso", "uivar", "unir", 
    "vela", "valeta", "vacilo", "valor", "vagem", "vadiagem", "vaca", "valentia", "vidro", "valsa", 
    "xícara", "xadrez", "xilofone", "xarope", "xenofobia", "xereta", "xerife", "xaveco", "xixi", "xale", 
    "zebra", "zagueiro", "zero", "zoeira", "zodíaco", "zangão", "zepelim", "zinco", "zoológico", "zumbido"
]
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
          <img data-identifier="game-image" src={imagemForca} />
        </div>
        <div className="botao">
          <button data-identifier="choose-word" className="botao-escolha" onClick={() => escolhaPalavra()}>Escolher Palavra</button>
          <div className="palavraEscolhida">
            {adivinharPalavra.map((letra) => <span data-identifier="word" className={jogo}>{letra}</span>)}
          </div>
        </div>
      </div>
      <div className="teclado">
        {alfabeto.map((letter, index) => <button key={index} className="letra" disabled={jogo === "jogando" ? letras.includes(index) : true} onClick={event => adivinhaLetra(event, index)}>{letter}</button>)}
      </div>
      <div className="footer">
        <label >Já sei a palavra!</label>
        <input data-identifier="type-guess" type="text" value={campoPalavra} disabled={!(jogo === "jogando")} onChange={(event) => setCampoPalavra(event.target.value)}></input>
        <button data-identifier="guess-button" disabled={!(jogo === "jogando")} onClick={() => adivinhaPalavra(campoPalavra.split(""))}>Chutar</button>
      </div>
    </div>
  )
}
