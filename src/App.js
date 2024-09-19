
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});

  async function handlesearch(){
    
    if(input === ""){
      alert("Preencha o CEP!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")

    }catch{
      alert("Erro ao realizar a busca")
      setInput("")

    }

  }

  return (
    <div className="container">
      <h1 className="title">BUSCADOR CEP</h1>
      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite o cep..."
        value={input}
        onChange={(evento) => setInput(evento.target.value)}
        />

        <button className="buttonSearch" onClick={handlesearch}>
          <FiSearch size={25} color="#FFF" />
        </button>

      </div>

      {Object.keys(cep).length > 0 &&(
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade} - {cep.uf}</span>

      </main>
      )}
      
    </div>
  );
}

export default App;
