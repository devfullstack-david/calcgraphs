"use client"

import '@/styles/pages.css'
import Image from 'next/image'

const AboutUs = () => {
  return (
    <div className='about-us__container'>
        <div className='about-us__content'>
            <div className='about-us__content-text'>
                <center>
                <h2>
                    Introdução
                </h2>
                    <p>
                        O CalcGraphs é uma aplicação com embasamento
                        em teoria dos grafos. O intuito da aplicação
                        é demonstrar como a teoria dos grafos é aplicada
                        em sistemas GPS, e como o cálculo de rotas (como
                        demonstrar o caminho mais curto) de um ponto de saída
                        ao um ponto de chegada. A lógica da aplicação é bem
                        simples, pois basta o usuário selecionar o algoritmo,
                        o meio de transporte, o ponto de saída e chegada e então
                        apertar no botão iniciar para o algoritmo calcular a rota
                    </p>
                </center>
            </div>
            <div className='about-us__content-image'>
                <Image
                    src='/grafos_gps.jpg'
                    alt='Grafos em gps'
                    width={600}
                    height={300}
                />
            </div>
        </div>
        
        <br />
        <br />

        <div className='about-us__content'>
            <div className='about-us__content-image'>
                <Image 
                    src={'/missao.jpg'}
                    alt='Nossa missão'
                    width={600}
                    height={350}
                />
            </div>

            <div className='about-us__content-text'>
                <center>
                    <h2>Nossa missão</h2>
                    <p>
                        A aplicação foi construída e destinada para 
                        ajudar em um público especifico, os estudantes
                        de computação ou áreas correlatas. Nós compreendemos
                        que para os estudantes de computação, quando estão 
                        estudando sobre a matéria de teoria dos grafos
                        podem enfrentar certas dificuldades em relação
                        ao objetivo dessa teoria matemática aplicada a computação.
                        Como a aplicação pode ser aplicada em diferentes 
                        tipos de aplicação, nós escolhemos focar em 
                        sistemas GPS pois tem um grande embasamento nesta
                        teoria.
                    </p>
                </center>
            </div>
        </div>

        <br />
        <br />

        <div>
            <center>
                <h2>Tecnologias</h2>
                <img 
                    src="https://skillicons.dev/icons?i=js,nextjs,react,java,spring,mysql,git,github" 
                />
                <p className='technologies-text'>
                    Neste projeto utilizamos algumas tecnologias
                    disponiveis para desenvolvimento da aplicação.
                    No frontend utilizamos o Javascript junto com o
                    framework NextJS que, tem por base o ReactJS. 
                    No backend fizemos o uso de Java com Spring,
                    para desenvolver a API que é integrada ao 
                    nosso frontend. Em relação ao banco de dados,
                    optamos pelo famoso MySQL que guarda informações
                    de localização, algoritmos e meio de transporte.
                    Por fim, como repositório e versionamento, utilizamos
                    o GIT juntamente com o Github.
                </p>
            </center>
        </div>
    </div>
  )
}

export default AboutUs