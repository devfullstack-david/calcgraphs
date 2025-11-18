"use client"

import "@/styles/pages.css"
import Select from '@/components/Select'
import { useRef, useState } from "react";
import GraphMap from "@/components/GraphMap";
import { generatePath } from "@/services/neighborhood";

export default function CalcGraph() {
  const [algorithm, setAlgorithm] = useState(null);
  const [startNode, setStartNode] = useState(null);
  const [path, setPath] = useState(null);
  const graphMapRef = useRef();
  const [endNode, setEndNode] = useState(null);

  const handleGenerate = async () => {
    try {
      const pathResponse = await generatePath(startNode, endNode, algorithm);
      setPath(pathResponse);
    } catch (error) {
      alert('Ocorreu um erro ao gerar o caminho');
    }
  };

  const clearData = () => {
    window.location.reload();
  };

  const updateStartNode = (value) => {
    setStartNode(value);
  };

  const updateEndNote = (value) => {
    setEndNode(value);
  };

  const algorithms = [
    {
      value: 'dijkstra',
      label: 'Dijkstra'
    },
    {
      value: 'a',
      label: 'A*'
    },
    {
      value: 'bellmanFord',
      label: 'Bellman-Ford'
    },
    {
      value: 'bfs',
      label: 'BFS'
    },
    {
      value: 'floydWarshall',
      label: 'Floyd-Warshall'
    },
  ];

  return (
    <div className="main-page__container">
      <h2>Selecione as opções abaixo</h2>
      
      <center>
        <p>Abaixo você pode selecionar
          as opções como o algoritmo a ser
          utilizado e o ponto inicial/final
          <br />
          Selecione no mapa de grafo
          o ponto inicial e o ponto final
          para executar o cálculo da rota
        </p>
      </center>

      <button  
        className='clear-data__button' 
        onClick={clearData}
      >
        Limpar seleção
      </button>
      
      <div className="main-page__select-container">
        <Select items={algorithms} placeholder="Selecione o algoritmo desejado" onSelectChange={setAlgorithm} />
      </div>

      <GraphMap 
        updateStartNode={updateStartNode} 
        updateEndNote={updateEndNote} 
        algorithm={algorithm}
        path={path}
        ref={graphMapRef}
      />

      <br />

      <button 
        className={'main-page__button'} 
        onClick={handleGenerate}
      >
        Gerar a rota
      </button>
    </div>
  );
}
