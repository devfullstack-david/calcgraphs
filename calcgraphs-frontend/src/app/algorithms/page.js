import '@/styles/pages.css';

const Algorithms = () => {
  return (
    <div className='algorithms'>
      <h2>Algoritmos</h2>
      <p>
        Abaixo você encontrará uma breve explicação, sobre os Algoritmos
        que são utilizados nesta aplicação.
      </p>

      <hr />

      <div>
        <h3>Dijkstra</h3>
        <p>
          O Algoritmo de Dijkstra é um dos algoritmos clássicos da área de grafos, 
          usado para encontrar o caminho mais curto entre um vértice de origem e 
          todos os outros vértices em um grafo ponderado (onde as arestas têm 
          "pesos" ou "custos") e cujos pesos das arestas são não negativos.
          Ele pode ser adaptado para encontrar o caminho mais curto entre apenas 
          dois vértices específicos, parando a execução assim que o 
          vértice de destino for alcançado.
        </p>
        <p>
          O algoritmo de Dijkstra funciona 
          construindo o caminho mais curto passo a passo. 
          Ele sempre escolhe o vértice não visitado que tem a 
          menor distância conhecida a partir da origem e 
          tenta "relaxar" (melhorar) as distâncias dos seus vizinhos.
        </p>

        <h4>Exemplo: Determinação de Rotas em Mapas ou Redes de Comunicação</h4>
        <ul>
          <li>
            <strong>Problema: </strong>Encontrar o caminho mais rápido ou mais curto 
            de um ponto de partida para todos os outros destinos em uma rede.
          </li>
          <br />

          <li>
            <strong>Grafo: </strong>Encontrar o caminho mais rápido ou mais curto 
            de um ponto de partida para todos os outros destinos em uma rede.
            <ul>
              <li>
                Vértices (Nós): Cruzamentos de ruas, cidades, ou roteadores em uma rede.
              </li>
              <li>
                Arestas (Conexões): Ruas, estradas, ou cabos de rede.
              </li>
              <li>
                Pesos: Tempo de viagem (positivo), distância (positiva) ou custo de banda (positivo).
              </li>
            </ul>
          </li>
          <br />

          <li>
            <strong>Por que Dijkstra é usado: </strong>Como o tempo 
            e a distância de viagem (ou a latência em uma rede bem-comportada) 
            são sempre valores não negativos (não se pode viajar por um tempo negativo), 
            o Dijkstra é a escolha ideal. Ele é muito eficiente para encontrar o 
            caminho mais curto para todos os nós a partir da origem, 
            sendo perfeito para protocolos de roteamento como o OSPF (Open Shortest Path First).
          </li>
        </ul>
      </div>

      <br />
      <hr />

      <div>
        <h3>A*</h3>
        <p>
          O Algoritmo A* (A-estrela) é considerado um dos melhores 
          e mais populares algoritmos de busca de caminho em grafos, 
          especialmente em áreas como Inteligência Artificial, 
          desenvolvimento de jogos (para navegação de personagens) 
          e sistemas de GPS.
        </p>
        <p>
          Ele é uma extensão do Algoritmo de Dijkstra, 
          mas com uma diferença crucial: 
          ele usa uma heurística para se guiar em direção ao destino, 
          tornando-o muito mais eficiente.
          Enquanto o Dijkstra procura o caminho mais curto 
          para todos os nós a partir da origem, 
          o A* procura o caminho mais curto para um destino 
          específico de forma mais inteligente.
        </p>
        <p>Ele é uma extensão do Algoritmo de Dijkstra, 
          mas com uma diferença crucial: ele usa 
          uma heurística para se guiar em direção 
          ao destino, tornando-o muito mais eficiente.
          Enquanto o Dijkstra procura o caminho mais curto 
          para todos os nós a partir da origem, o A* procura 
          o caminho mais curto para um destino específico 
          de forma mais inteligente.
        </p>
        <p>
          Uma heurística é admissível se ela nunca superestimar o custo real para chegar ao destino.
          <li className='example-algorithm'>
            Exemplo: A distância em linha reta entre dois pontos 
            é sempre admissível, pois é fisicamente impossível 
            que o caminho real seja mais curto do que a linha reta.
          </li>
          Se a heurística for admissível, o A* tem a garantia de ser ótimo, 
          ou seja, de encontrar o caminho mais curto. Se você usar 
          h(n)=0 para todos os nós, 
          o A* se torna exatamente o Algoritmo de Dijkstra.
        </p>

        <h4>Exemplo: Movimentação de Personagens em Jogos (Pathfinding) ou Roteamento de GPS</h4>

        <ul>
          <li>
            <strong>Problema: </strong>Encontrar o caminho mais curto de um ponto 
            A a um ponto B em um mapa grande, de forma rápida e eficiente.
          </li>
          <br />

          <li>
            <strong>Grafo: </strong>
            <ul>
              <li>Vértices (Nós): Quadrados em uma grade de jogo, ou pontos geográficos no mapa.</li>
              <li>Arestas (Conexões): Movimentos entre quadrados ou segmentos de rua.</li>
              <li>Pesos: Custo para se mover (positivo), tempo.</li>
            </ul>
          </li>
          <br />

          <li>
            <strong>Por que A* é usado: </strong>
            Embora o Dijkstra também encontre o caminho mais curto, 
            ele explora em todas as direções. 
            O A* usa uma heurística (como a distância em linha reta até o destino) 
            para direcionar sua busca. Isso significa que 
            ele explora muito menos nós e chega ao destino 
            muito mais rápido do que o Dijkstra em ambientes grandes, 
            como os usados em jogos ou aplicativos de mapas, 
            onde o destino é sempre conhecido.
          </li>
        </ul>
      </div>

      <br />
      <hr />

      <div>
        <h3>Bellman-Ford</h3>
        <p>
          O Algoritmo de Bellman-Ford é um algoritmo 
          de caminho mais curto de fonte única, 
          tal como o Dijkstra, mas com uma 
          distinção fundamental que o torna 
          indispensável em certas situações.
          É o principal algoritmo para encontrar o 
          caminho mais curto em grafos ponderados 
          que contenham arestas com pesos negativos.
        </p>
        <p>
          Como mencionado anteriormente, o Dijkstra e o A* 
          não funcionam corretamente se houver arestas com 
          pesos negativos. O Bellman-Ford foi criado 
          para resolver esse problema. A característica mais 
          poderosa do Bellman-Ford é a sua capacidade de 
          detectar a presença de ciclos de peso negativo 
          (também chamados de ciclos negativos).
        </p>
        <p>
          Um ciclo negativo é um loop no grafo onde a 
          soma dos pesos de todas as arestas ao redor 
          do ciclo é um valor negativo.Problema: 
          Se um ciclo negativo for acessível a partir da origem, 
          o conceito de "caminho mais curto" perde o sentido, 
          pois você pode dar voltas indefinidamente no ciclo 
          negativo e diminuir o custo do caminho a cada volta 
          (Ex: 10, 8, 6, 4...).
        </p>

        <h4>Exemplo: Arbitragem de Moedas Estrangeiras</h4>

        <ul>
          <li>
            <strong>Problema: </strong>Em mercados de câmbio, 
            determinar se é possível começar com uma moeda 
            e, através de uma série de trocas (ciclo), 
            terminar com mais dinheiro do que se começou (lucro).
          </li>
          <br />

          <li>
            <strong>Grafo: </strong>
            <ul>
              <li>
                Vértices (Nós): Diferentes moedas (USD, EUR, BRL).
              </li>
              <li>
                Arestas (Conexões): Taxas de câmbio entre as moedas.
              </li>
            </ul>
          </li>
          <br />

          <li>
            <strong>Por que Bellman-Ford é usado: </strong>
            <ol>
              <li>
                O Bellman-Ford pode lidar com os pesos transformados que, neste contexto, podem ser negativos.
              </li>

              <li>
                Mais crucialmente, se o algoritmo de Bellman-Ford detectar 
                um ciclo negativo na sua etapa final, ele encontrou a rota 
                exata de trocas que leva ao lucro (a oportunidade de arbitragem). 
                Dijkstra não poderia fazer isso.
              </li>
            </ol>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Algorithms