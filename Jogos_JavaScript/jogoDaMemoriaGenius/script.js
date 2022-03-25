let order = []; //Ordem de acendimento das cores
let clickedOrder = []; //Ordem do Clique
let score = 0;

/* 
0 = verde
1 = vermelho
2 = amarelo
3 = azul 
*/

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");

//Função para determinar a ordem randomica das cores
let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for (let i in order) {
    //define a quantidade de iterações que a função rodará.
    let elementColor = createColorElement(order[i]); //A cada iteração, o item de índice i em order será o valor da variável
    lightColor(elementColor, Number(i) + 1);
  }
};

//Função que acende e apaga as cores
let lightColor = (element, number) => {
  number = number * 500;
  setTimeout(() => {
    element.classList.add("selected");
  }, number - 250);
  setTimeout(() => {
    element.classList.remove("selected");
  });
};

//Função que verifica se a ordem de cores clicadas é igual à de acendidas.
let checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      gameOver();
      break;
    }
  }
  if (clickedOrder.length == order.length) {
    alert(
      `Pontuação: ${score}\n Parabéns, você acertou! Iniciando próximo nível.`
    );
    nextLevel();
  }
};

//Função que recebe o click do jogador, adiciona e remove a classe selected do item clicado e verifica se a ordem dos cliques é igual à ordem de cores.
let click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add("selected");

  setTimeout(() => {
    createColorElement(color).classList.remove("selected");
    checkOrder();
  }, 250);
};

//Função que retorna a cor
let createColorElement = (color) => {
  if (color == 0) {
    return green;
  } else if (color == 1) {
    return red;
  } else if (color == 2) {
    return yellow;
  } else if (color == 3) {
    return blue;
  }
};

//Função que passa de nível
let nextLevel = () => {
  score++;
  shuffleOrder();
};

let gameOver = () => {
  alert(
    `Pontuação: ${score}!\n  Você errou! \n Clique em OK para iniciar um novo jogo`
  );
  order = [];
  clickedOrder = [];

  playGame();
};

let playGame = () => {
  alert("Bem vindo ao Gênesis! \n Iniciando novo jogo!");
  score = 0;

  nextLevel();
};

// Cria eventos para cliques da cor
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();
