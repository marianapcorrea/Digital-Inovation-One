let jogador,
  vencedor = null;
let jogadorSelecionado = document.getElementById("jogadorSelecionado");
let vencedorSelecionado = document.getElementById("vencedorSelecionado");

mudarJogador("X");

function escolherQuadrado(id) {
  if (vencedor !== null) {
    return;
  }
  let quadrado = document.getElementById(id);

  if (quadrado.innerHTML !== "-") {
    return;
  }

  quadrado.innerHTML = jogador;
  quadrado.style.color = "#000";

  if (jogador === "X") {
    jogador = "O";
  } else {
    jogador = "X";
  }

  checaVencedor();
}

function mudarJogador(valor) {
  jogador = valor;
  jogadorSelecionado.innerHTML = jogador;
}

function checaVencedor() {
  let quadrado1 = document.getElementById(1);
  let quadrado2 = document.getElementById(2);
  let quadrado3 = document.getElementById(3);
  let quadrado4 = document.getElementById(4);
  let quadrado5 = document.getElementById(5);
  let quadrado6 = document.getElementById(6);
  let quadrado7 = document.getElementById(7);
  let quadrado8 = document.getElementById(8);
  let quadrado9 = document.getElementById(9);

  //Horizontal - Linha1
  if (checaSequência(quadrado1, quadrado2, quadrado3)) {
    mudaCorQuadrado(quadrado1, quadrado2, quadrado3);
    mudaVencedor(quadrado1);
    return;
  }

  //Horizontal - Linha 2
  if (checaSequência(quadrado4, quadrado5, quadrado6)) {
    mudaCorQuadrado(quadrado4, quadrado5, quadrado6);
    mudaVencedor(quadrado4);
    return;
  }
  //Horizontal - Linha3
  if (checaSequência(quadrado7, quadrado8, quadrado9)) {
    mudaCorQuadrado(quadrado7, quadrado8, quadrado9);
    mudaVencedor(quadrado7);
    return;
  }

  //Vertical - Linha 1
  if (checaSequência(quadrado1, quadrado4, quadrado7)) {
    mudaCorQuadrado(quadrado1, quadrado4, quadrado7);
    mudaVencedor(quadrado1);
    return;
  }

  //Vertical - Linha 2
  if (checaSequência(quadrado2, quadrado5, quadrado8)) {
    mudaCorQuadrado(quadrado2, quadrado5, quadrado8);
    mudaVencedor(quadrado2);
    return;
  }
  //Vertical - Linha 3
  if (checaSequência(quadrado3, quadrado6, quadrado9)) {
    mudaCorQuadrado(quadrado3, quadrado6, quadrado9);
    mudaVencedor(quadrado3);
    return;
  }

  //Transversal 1
  if (checaSequência(quadrado1, quadrado5, quadrado9)) {
    mudaCorQuadrado(quadrado1, quadrado5, quadrado9);
    mudaVencedor(quadrado1);
    return;
  }
  //Transversal 2
  if (checaSequência(quadrado3, quadrado5, quadrado7)) {
    mudaCorQuadrado(quadrado3, quadrado5, quadrado7);
    mudaVencedor(quadrado3);
  }
}

function checaSequência(quadrado1, quadrado2, quadrado3) {
  let sequenciaIgual = false;
  if (
    quadrado1.innerHTML !== "-" &&
    quadrado1.innerHTML === quadrado2.innerHTML &&
    quadrado2.innerHTML === quadrado3.innerHTML
  ) {
    sequenciaIgual = true;
  }
  return sequenciaIgual;
}

function mudaCorQuadrado(quadrado1, quadrado2, quadrado3) {
  quadrado1.style.color = "#2e6825";
  quadrado2.style.color = "#2e6825";
  quadrado3.style.color = "#2e6825";
}

function mudaVencedor(quadrado) {
  vencedor = quadrado.innerHTML;
  vencedorSelecionado.innerHTML = vencedor;
}

function reiniciaJogo() {
  vencedor = null;
  vencedorSelecionado.innerHTML = "";
  for (var i = 1; i <= 9; i++) {
    let quadrado = document.getElementById(i);
    quadrado.style.color = "#eee";
    quadrado.innerHTML = "-";
  }
  mudarJogador("X");
}
