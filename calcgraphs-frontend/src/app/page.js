"use client"

import "@/styles/home.css"

export default function Home() {
  return (
    <div>
      <header>
        <div className="header-container">
          <h1 className="header-container__title">CalcGraphs</h1>
          <p className="header-container__description">Explore rotas inteligentes com o poder da Teoria dos Grafos</p>
        </div>
        <div className="header-container__icons">
          <div>📍</div>
          <div>🗺️</div>
          <div>📡</div>
          <div>🔍</div>
          <div>🧭</div>
        </div>
      </header>
        <section id="sobre">
          <h2>Sobre Nós</h2>
          <h3>Introdução</h3>
          <p>O CalcGraphs é uma aplicação fundamentada na Teoria dos Grafos. Seu objetivo é demonstrar como essa teoria é aplicada em sistemas GPS, mostrando como encontrar o caminho mais curto entre um ponto de saída e um ponto de chegada. A lógica da aplicação é simples: o usuário seleciona o algoritmo desejado, o meio de transporte, o ponto inicial e o final, e então inicia o cálculo para visualizar a rota no mapa.</p>


          <h3>Nossa Missão</h3>
          <p>A aplicação foi criada especialmente para estudantes de computação e áreas relacionadas. Sabemos que a Teoria dos Grafos pode gerar dúvidas sobre sua aplicação prática, por isso decidimos demonstrar seu papel essencial em sistemas GPS — uma das áreas mais intuitivas para compreender como grafos resolvem problemas reais.</p>


          <h3>Tecnologias</h3>
          <p>No frontend utilizamos JavaScript com NextJS (baseado em ReactJS). No backend, Typescript com Express e Knex para estruturar nossa API integrada ao frontend. Para o banco de dados, utilizamos MySQL, armazenando informações de localização, algoritmos e meios de transporte. Como repositório e versionamento, usamos Git e GitHub.</p>
        </section>


        <section id="grafos">
          <h2>Grafos</h2>
          <p>A Teoria dos Grafos é uma área da Matemática Discreta que modela relações entre elementos por meio de vértices e arestas. Essa estrutura permite representar sistemas complexos de forma simples, sendo essencial para diversas áreas da computação.</p>
          <p>Na computação, muitos algoritmos e estruturas de dados se baseiam em grafos, possibilitando resolver problemas de conectividade, caminhos e organização de informação. Eles são amplamente usados em redes de computadores, redes sociais, inteligência artificial e sistemas de recomendação.</p>
          <p>Uma das aplicações mais visíveis dessa teoria está nos sistemas de navegação, como GPS e aplicativos de mapas. Neles, ruas e cruzamentos são modelados como grafos, e algoritmos como Dijkstra e A* calculam rotas eficientes considerando distância, tempo ou custo. Essa lógica também é a base do funcionamento do CalcGraphs.</p>
        </section>


        <footer className="footer">
          <p>© 2025 CalcGraphs - Todos os direitos reservados</p>
        </footer>
    </div>
  );
}
