"use client"

import "@/styles/pages.css"
import Select from '@/components/Select'
import { useState } from "react";
import GraphMap from "@/components/GraphMap";

export default function Home() {
  const [algorithm, setAlgorithm] = useState("");
  const [transport, setTransport] = useState("");

  const handleGenerate = () => {};

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
    }
  ];

  const transports = [
    {
      value: 'car',
      label: 'Carro'
    },
    {
      value: 'bus',
      label: 'Ônibus'
    },
    {
      value: 'walk',
      label: 'Caminhando'
    },
    {
      value: 'motocycle',
      label: 'Motocicleta'
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
      
      <div className="main-page__select-container">
        <Select items={algorithms} placeholder="Selecione o algoritmo desejado" onSelectChange={setAlgorithm} />
        <Select items={transports} placeholder="Selecione seu meio de transporte" onSelectChange={setTransport} />
      </div>

      <button className="main-page__button" onClick={handleGenerate}>
        Gerar a rota
      </button>

      <GraphMap />
    </div>
  );
}
