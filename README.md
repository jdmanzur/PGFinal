# PGFinal

## Membros do Grupo

- Bruno Frítoli Carrazza 770993
- Gustavo de Jesus Rodrigues Silva 771021
- Jade Manzur 771025
- Thiago Domingues da Silva 802276



### Objetivo:

A ideia foi montar uma visão surrealista do espaço sideral com vários elementos únicos que quando colocados juntos criam uma vista agradável e divertida.


### Especificações

**Visualização de pelo menos um objeto 3D por membro do grupo, redimensionando e posicionando cada objeto individualmente no ambiente virtual**

Existem os objetos:

- Gato
- Torus
- Planeta
- Icosaedro
- Estrelas
- Entre outros...

Somos 4 membros então batemos a meta

**Utilização de um shader próprio em um dos objetos (RawShaderMaterial)**

É usado um shader de transição de cor no planeta

**Definição de pelo menos duas câmeras**

O projeto é separado em duas câmeras:

- Camera1 - Possui movimento livre com mouse. Apertando click esquerdo modificamos a rotação, apertando click direito modifica o plano, scroll para zoom in e zoom out

- Camera2 - Possui movimento orbital em volta do gato. Não possui movimento livre
    Obs: Movimentos com click ou scroll feitos enquanto na camera2 vão afetar o estado da camera1


Apertando o botão de "Troca câmera" a câmera é trocada alternadamente entre a camera 1 e 2

**Movimento simples de pelo menos um objeto**

Vários objetos tem movimento, um exemplo é a orbita do planeta.

Além disso, para controlar alguns movimentos temos dois sliders de rotação:

- Rotação X - muda a velocidade da rotação X do anel amarelo 
- Rotação Y - muda a velocidade da rotação Y do quadrado mais externo e a velocidade de orbita do planeta

## Instalação

O projeto foi feito com three.js e mantido via npm

para instalar execute 

```sh
npm install
npm run dev
```

isso vai abrir uma instância local do app rodando em http://localhost:5173/
