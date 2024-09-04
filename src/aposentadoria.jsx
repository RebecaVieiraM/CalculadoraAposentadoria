import React, { useState, useEffect } from 'react'; // Importa os hooks do react
import { fetchAposentadorias } from './services/api'; // Importa a api
import './aposentadoria.css'; // Importa o css

const Aposentadoria = () => {
    const [aposentadorias, setAposentadorias] = useState([]); // Estado para armazenar todas as aposentadorias

    const [ocupacaoInput, setOcupacaoInput] = useState(""); // Estado para armazenar o valor do campo de input da ocupacao
    const [generoInput, setGeneroInput] = useState(""); // Estado para armazenar o valor do campo de input do genero
    const [idadeInput, setIdadeInput] = useState(""); // Estado para armazenar o valor do campo de input da idade

    const [idadeAtual, setIdadeAtual] = useState(null); // Estado para armazenar a aposentadoria encontrada

    const [aposentadoriaAtual, setAposentadoriaAtual] = useState(null); // Estado para armazenar a aposentadoria encontrada

    const [mensagem, setMensagem] = useState(""); // Estado para armazenar mensagens de erro ou status
    var falta = 0;
  
    useEffect(() => {
        const carregaApi = async () => {
        try { 
            const dadosAposentadorias = await fetchAposentadorias();
            setAposentadorias(dadosAposentadorias.regras_aposentadoria); // Armazena as aposentadorias no estado
        } catch (error) {
            setMensagem("Erro ao carregar as aposentadorias! Tente novamente mais tarde."); // Mensagem de erro ao falhar a busca
            console.error("Erro de acesso à API: ", error); // Exibe um erro no console
        }
        };

        carregaApi(); // Carrega as aposentadorias ao montar o componente
    }, []); // Executa a ação de buscar a api somente quando a tela é carregada (somente 1 vez)

    const carregaAposentadoria = () => { // Função chamada ao clicar no botão Calcular

        const aposentadoriaEncontrada = aposentadorias.find(apos => (idadeInput >= apos.idade_minima) && (apos.genero == generoInput) && (apos.ocupacao == ocupacaoInput));
        console.log(aposentadoriaEncontrada)

        if (aposentadoriaEncontrada) { // Verifica se a aposentadoria foi encontrada. Se aposentadoriaEncontrada não for undefined ou null, a aposentadoria foi encontrada na lista
            setAposentadoriaAtual(aposentadoriaEncontrada); // Atualiza a aposentadoriaAtual com a aposentadoriaEncontrada
            setMensagem("Faltam "+ (aposentadoriaAtual.idade_minima - idadeInput) + "anos para sua aposentadoria"); // Limpa qualquer mensagem anterior

        } else { // Se não for encontrada nenhuma aposentadoria, executa a ação a seguir
            setAposentadoriaAtual(null); // Define aposentadoriaAtual como null
            setMensagem("Aposentadoria não disponível."); // Mensagem de aposentadoria não encontrada
        }

    };

  return (
    <div className='container-app'>
      <h1>Cálculo de Aposentadoria</h1>
      <div className='campos'>
        <label className='lblOcupação' style={{textAlign: 'center'}}>
          Insira sua ocupação:
          <br />
          <br />
          <input
            className="inpOcupação"
            type="text"
            value={ocupacaoInput} // Controla o valor do input com o estado
            onChange={(e) => setOcupacaoInput(e.target.value)} // Atualiza o estado do ocupacaoInput conforme o usuário digita
          />
        </label>
        <label className='lblGenero' style={{textAlign: 'center'}}>
          Insira seu gênero:
          <br />
          <br />
          <input
            className="inpGenero"
            type="text"
            value={generoInput} // Controla o valor do input com o estado
            onChange={(e) => setGeneroInput(e.target.value)} // Atualiza o estado do generoInput conforme o usuário digita
          />
        </label>
        <label className='lblIdade' style={{textAlign: 'center'}}>
          Insira sua idade:
          <br />
          <br />
          <input
            className="inpIdade"
            type="text"
            value={idadeInput} // Controla o valor do input com o estado
            onChange={(e) => setIdadeInput(e.target.value)} // Atualiza o estado do idadeInput conforme o usuário digita
          />
        </label>
        <button className='btnCalcular' onClick={carregaAposentadoria} style={{color: 'white', borderRadius: '5px', borderColor: 'green', backgroundColor: 'green', padding: '10px'}}>Calcular</button> {/* Botão para calcular o tempo */}
      </div>
      <div className='div-mensagem'>
        {mensagem && <p className="mensagem">{mensagem}</p>} {/* Renderiza um p, que exibe mensagem de erro ou status, somente se mensagem não for undefined ou null */}
      </div>
    </div>
  );
};

export default Aposentadoria; // Exporta o componente Aposentadoria
