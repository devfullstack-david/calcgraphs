import '@/styles/pages.css'
import Image from 'next/image'

const Graphs = () => {
  return (
    <div> 
      <div className='introduce-graphs'>
        <h2>Teoria dos grafos e sua aplicação na computação</h2>
        <p>
          A Teoria dos Grafos, um ramo fascinante da Matemática Discreta, 
          oferece um arsenal poderoso para modelar e resolver uma vasta 
          gama de problemas. Essencialmente, um grafo é uma estrutura 
          composta por um conjunto de elementos, chamados vértices (ou nós), 
          e um conjunto de conexões entre esses elementos, denominadas arestas. 
          Essa representação abstrata de objetos e suas relações interligadas 
          permite simplificar e visualizar a complexidade de sistemas reais, 
          sejam eles de natureza social, biológica, logística ou
          fundamentalmente, computacional
        </p>
        <p>
          Na Ciência da Computação, a Teoria dos Grafos não é apenas um conceito teórico; 
          ela é o alicerce sobre o qual muitos dos algoritmos e estruturas de dados 
          mais importantes são construídos. A capacidade de modelar dados e processos 
          como grafos permite o desenvolvimento de soluções eficientes para problemas 
          que envolvem conectividade, caminhos e fluxos. Estruturas de dados como árvores 
          (que são grafos especiais) e as próprias representações de grafos 
          (como listas de adjacência ou matrizes de adjacência) 
          são cruciais para a organização e manipulação de informações.
        </p>
        <p>
          A relevância prática da Teoria dos Grafos na computação é inegável, 
          permeando diversas áreas de aplicação. No campo das redes de computadores, 
          por exemplo, os algoritmos de grafos, como o de Dijkstra ou o de Floyd-Warshall, 
          são usados para encontrar o caminho mais curto e eficiente para o roteamento 
          de dados na internet. Em sistemas de redes sociais, são aplicados para analisar 
          comunidades e relações. Em inteligência artificial, eles sustentam a modelagem de 
          problemas de busca e o raciocínio em grafos de conhecimento. 
          Seja para otimizar rotas de entrega, projetar circuitos eletrônicos, 
          desenvolver sistemas de recomendação ou resolver quebra-cabeças complexos, 
          a Teoria dos Grafos fornece a linguagem e as ferramentas analíticas essenciais 
          para transformar desafios do mundo real em problemas computacionais solucionáveis.
        </p>
        <p>
          A aplicação mais visível e prática da Teoria dos Grafos na vida cotidiana, 
          e um de seus grandes triunfos na Ciência da Computação, está nos sistemas 
          de navegação, como o GPS e aplicativos de mapas (Google Maps, Waze, etc.). 
          Nesses sistemas, o mapa geográfico é modelado como um grafo direcionado (dígrafo), 
          onde as ruas, avenidas e cruzamentos são representados por vértices e os segmentos 
          de via são as arestas. Cada aresta recebe um peso que pode representar a distância 
          (para o caminho mais curto), o tempo de percurso (para o caminho mais rápido, considerando o trânsito), 
          ou até mesmo o custo (pedágios). A função essencial do GPS, de calcular a rota mais eficiente 
          entre a origem e o destino, é resolvida por meio de algoritmos clássicos de busca em grafos, 
          como o algoritmo de Dijkstra ou o algoritmo A*. Esses algoritmos percorrem o grafo de maneira 
          inteligente para identificar a sequência ideal de arestas (segmentos de via) que minimiza o 
          peso total da rota, permitindo que os usuários cheguem ao seu destino de forma rápida e otimizada.
        </p>
        <Image 
          src={'/graph-map-gps.png'}
          width={500}
          height={300}
          alt='Mapa de grafo em GPS'
        />
      </div>
    </div>
  )
}

export default Graphs