# PGFinal

## Membros do Grupo

- Bruno Frítoli Carrazza 770993
- Gustavo de Jesus Rodrigues Silva 771021
- Jade Manzur 771025
- Thiago Domingues da Silva 802276



### O Projeto:

O projeto consiste de uma cena com uma visão surrealista do espaço sideral, com vários elementos tridimensionais. Como objeto central, temos um modelo 3D de um gato importado do Sketchfab. Em volta do gatinho, temos diversos outros elementos geométricos que compõem a cena.
Dentro do projeto, há duas câmeras: uma que pode ser movida livremente com o input do mouse e outra que gira automaticamente, com FOVs diferentes. A maioria dos objetos na cena possuem um movimento simples implementado e um deles possui um RawShaderMaterial próprio.

### Especificações

**Visualização de pelo menos um objeto 3D por membro do grupo, redimensionando e posicionando cada objeto individualmente no ambiente virtual**

Existem os objetos:

- Gato
- Torus
- Planeta
- Icosaedro
- Estrelas
- Entre outros...

**Utilização de um shader próprio em um dos objetos (RawShaderMaterial)**

É usado um shader de transição de cor no planeta. 

**Definição de pelo menos duas câmeras**

O projeto é separado em duas câmeras:

- Camera1 - Possui movimento livre com mouse. Apertando click esquerdo modificamos a rotação, apertando click direito modifica o plano, scroll para zoom in e zoom out

- Camera2 - Possui movimento orbital em volta do gato. Não possui movimento livre
    Obs: Movimentos com click ou scroll feitos enquanto na camera2 vão afetar o estado da camera1

Apertando o botão de "Trocar Câmera" a câmera é trocada alternadamente entre a camera 1 e 2.

**Movimento simples de pelo menos um objeto**

Vários objetos tem movimento, um exemplo é a orbita do planeta.
Dentro da cena, podemos controlar a velocidade de rotação de alguns objetos com os inputs:

- Rotação X - muda a velocidade da rotação X do anel amarelo 
- Rotação Y - muda a velocidade da rotação Y do losango mais externo e a velocidade de orbita do planeta

## Instalação

O projeto foi feito com three.js e mantido via npm

para instalar execute 

```sh
npm install
npm run dev
```

isso vai abrir uma instância local do app rodando em http://localhost:5173/

### Referências

Utilizamos como referência para o projeto os tutoriais a seguir.

Explica brevemente como utilizar shaders no three.js, dando uma visão geral do que são e como funcionam

- [Three.js Shaders in 2 Minutes](https://www.youtube.com/watch?v=bC4xJzbKNd0&ab_channel=ChrisCourses)

Os vídeos a seguir oferecem uma explicação mais detalhada sobre shaders no three.js.

- [Three.js Tutorial on Shaders (beginners)](https://www.youtube.com/watch?v=C8Cuwq1eqDw&ab_channel=SimonDev)
- [Modern ThreeJS Shaders with GLSL Vite plugin](https://www.youtube.com/watch?v=VF2nJxoIA6c&t=3099s&ab_channel=AlvaroDevLabs)

Este vídeo é um tutorial compreensivo para o three.js e como gerar uma cena básica. Seguimos este tutorial para montar a estrutura do nosso projeto e aproveitamos a implementação de uma função para gerar as estrelas que estão na cena, modificando-a para atribuir cores às esferas geradas.

- [Build a Mindblowing 3D Portfolio Website](https://www.youtube.com/watch?v=Q7AOvWpIVHU&ab_channel=Fireship)

