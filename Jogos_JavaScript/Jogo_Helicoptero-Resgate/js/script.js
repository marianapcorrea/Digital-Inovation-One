function start() {
  //Oculta a div inicial e cria div para os elementos do jogo
  $("#inicio").hide(); //Oculta a div #início

  $("#fundoGame").append("<div id='jogador' class='anima1'></div>"); //Cria novas divs
  $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
  $("#fundoGame").append("<div id='inimigo2' class=''></div>");
  $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
  $("#fundoGame").append("<div id='placar'></div>");
  $("#fundoGame").append("<div id='energia'></div>");

  //Principais variáveis do jogo:
  var jogo = {};
  var TECLA = {
    //variável tipo array que indica o valor decimal de cada uma das teclas do jogo.
    W: 87,
    S: 83,
    D: 68,
  };
  var velocidade = 5;
  var posicaoY = parseInt(Math.random() * 334); //Define um intervalo randomico para a posição do inimigo
  var podeAtirar = true;
  var fimDeJogo = false; //Variável para finalização do jogo
  var pontos = 0;
  var salvos = 0;
  var perdidos = 0;
  var energiaAtual = 3;
  var somDisparo = document.getElementById("somDisparo");
  var somExplosao = document.getElementById("somExplosao");
  var musica = document.getElementById("musica");
  var somGameover = document.getElementById("somGameover");
  var somPerdido = document.getElementById("somPerdido");
  var somResgate = document.getElementById("somResgate");

  //Música em loop
  musica.addEventListener(
    "ended",
    function () {
      musica.currentTime = 0;
      musica.play();
    },
    false
  );
  musica.play();

  jogo.pressionou = []; //Valor booleano que indica se o usuário pressionou ou não uma tecla

  $(document).keydown(function (e) {
    //Identifica que uma tecla foi pressionada
    jogo.pressionou[e.which] = true;
  });

  $(document).keyup(function (e) {
    //Indica que não há nenhuma tecla pressionada no momento.
    jogo.pressionou[e.which] = false;
  });

  //Loop do jogo
  jogo.timer = setInterval(loop, 30); //define um loop para a função moveFundo de trinta milisegundos
  function loop() {
    //chama as seguintes funções para dentro da função Loop, para que elas aconteçam em loop.
    moveFundo();
    moveJogador();
    moveInimigo1();
    moveInimigo2();
    moveAmigo();
    colisao();
    placar();
    energia();
  }

  function moveFundo() {
    //Função que movimenta o fundo do jogo um pixel à esquerda a cada loop
    esquerda = parseInt($("#fundoGame").css("background-position")); //Pega a posicao atual da div #fundoGame
    $("#fundoGame").css("background-position", esquerda - 1); //Atualiza a posição da div.
  }

  function moveJogador() {
    if (jogo.pressionou[TECLA.W]) {
      var topo = parseInt($("#jogador").css("top")); //Pega a posição da div #jogador atual
      $("#jogador").css("top", topo - 10); //faz com que a div ande dez unidades para cima.

      if (topo <= 0) {
        $("#jogador").css("top", topo + 10); //Se a posição for menor ou igual a zero, a div será deslocada dez unidades para baixo, impedindo o helicoptero de ultrapassar o background
      }
    }
    if (jogo.pressionou[TECLA.S]) {
      var topo = parseInt($("#jogador").css("top")); //Pega a posição da div #jogador atual
      $("#jogador").css("top", topo + 10); //faz com que a div ande dez unidades para baixo.

      if (topo >= 434) {
        $("#jogador").css("top", topo - 10); //Se a posição for maior ou igual a zero, a div será deslocada dez unidades para cima, impedindo o helicoptero de ultrapassar o background
      }
    }
    if (jogo.pressionou[TECLA.D]) {
      disparo(); //Chama função Disparo
    }
  }

  function moveInimigo1() {
    posicaoX = parseInt($("#inimigo1").css("left")); //Pega a posição atual da  div inimigo1
    $("#inimigo1").css("left", posicaoX - velocidade); //Subtrai a posição horizontal atual da div pela velocidade, para definir nova posição, causando o movimento de deslocamento para a esquerda
    $("#inimigo1").css("top", posicaoY); //Posiciona verticalmente a div #inimigo1, de maneira randomica

    if (posicaoX <= 0) {
      posicaoY = parseInt(Math.random() * 334); //Limita o deslocamento do inimigo1 para respeitar a área do jogo.
      $("#inimigo1").css("left", 694);
      $("#inimigo1").css("top", posicaoY);
    }
  }

  function moveInimigo2() {
    posicaoX = parseInt($("#inimigo2").css("left"));
    $("#inimigo2").css("left", posicaoX - 3);

    if (posicaoX <= 0) {
      $("#inimigo2").css("left", 775);
    }
  }

  function moveAmigo() {
    posicaoX = parseInt($("#amigo").css("left"));
    $("#amigo").css("left", posicaoX + 1);

    if (posicaoX > 906) {
      $("#amigo").css("left", 0);
    }
  }

  function disparo() {
    if (podeAtirar == true) {
      podeAtirar = false; //Impede que a função seja executada novamente (novo tiro) enquanto a função podeAtirar estiver em andamento
      topo = parseInt($("#jogador").css("top"));
      posicaoX = parseInt($("#jogador").css("left")); //Pega a posição do helicóptero
      tiroX = posicaoX + 180;
      topoTiro = topo + 50; //define a posição de origem do disparo, que terá como base a posição atual do helicoptero
      $("#fundoGame").append("<div id='disparo'></div"); //cria div #disparo no HTML
      $("#disparo").css("top", topoTiro); //posiciona a div disparo
      $("#disparo").css("left", tiroX);

      var tempoDisparo = window.setInterval(executaDisparo, 30); //cria efeito de movimentação do disparo, ao chamar a função executaDisparo a cada 30 milisegundos
    }

    function executaDisparo() {
      posicaoX = parseInt($("#disparo").css("left"));
      $("#disparo").css("left", posicaoX + 15); // define velocidade do disparo. A cada iteração, o disparo se move a posição atual mais 15 unidades.

      if (posicaoX > 900) {
        //Defune que, ao chegar na posiçaõ 900 na tela, a variável tempoDisparo terá valor nulo, a div #disparo será removida do código e a variável podeAtirar terá novamente o valor true
        window.clearInterval(tempoDisparo);
        tempoDisparo = null;
        $("#disparo").remove();
        podeAtirar = true;
      }
    }
  }

  function colisao() {
    var colisao1 = $("#jogador").collision($("#inimigo1")); //define colisao do  jogador com o inimigo1, atribuindo valor à variável se a colisão ocorrer.
    var colisao2 = $("#jogador").collision($("#inimigo2"));
    var colisao3 = $("#disparo").collision($("#inimigo1"));
    var colisao4 = $("#disparo").collision($("#inimigo2"));
    var colisao5 = $("#jogador").collision($("#amigo"));
    var colisao6 = $("#inimigo2").collision($("#amigo"));

    if (colisao1.length > 0) {
      //Colisao jogador-inimigo1
      //Verifica se a variável colisão1 está preenchida(maior que zero)
      energiaAtual--;
      somExplosao.play();
      inimigo1X = parseInt($("#inimigo1").css("left")); //Captura as posições do inimigo1
      inimigo1Y = parseInt($("#inimigo1").css("top"));
      explosao1(inimigo1X, inimigo1Y); //Define as variáveis da posição do inimigo como parâmetro para a função da explosao1
      posicaoY = parseInt(Math.random() * 334); //Valor randomico que reposiciona o Inimigo1
      $("#inimigo1").css("left", 694);
      $("#inimigo1").css("top", posicaoY);
    }

    if (colisao2.length > 0) {
      // jogador com o inimigo2
      energiaAtual--;
      somExplosao.play();
      inimigo2X = parseInt($("#inimigo2").css("left"));
      inimigo2Y = parseInt($("#inimigo2").css("top"));
      explosao2(inimigo2X, inimigo2Y);
      $("#inimigo2").remove();
      reposicionaInimigo2(); //Chama uma nova função para reposicionar o inimigo2
    }

    if (colisao3.length > 0) {
      // Disparo com o inimigo1
      pontos = pontos + 100;
      somDisparo.play();
      velocidade = velocidade + 0.2;
      inimigo1X = parseInt($("#inimigo1").css("left"));
      inimigo1Y = parseInt($("#inimigo1").css("top"));

      explosao1(inimigo1X, inimigo1Y);
      $("#disparo").css("left", 950);
      posicaoY = parseInt(Math.random() * 334);
      $("#inimigo1").css("left", 694);
      $("#inimigo1").css("top", posicaoY);
    }

    if (colisao4.length > 0) {
      // Disparo com o inimigo2
      velocidade = velocidade + 0.2;
      pontos = pontos + 50;
      somDisparo.play();
      inimigo2X = parseInt($("#inimigo2").css("left"));
      inimigo2Y = parseInt($("#inimigo2").css("top"));
      $("#inimigo2").remove();
      explosao2(inimigo2X, inimigo2Y);
      $("#disparo").css("left", 950);
      reposicionaInimigo2();
    }

    if (colisao5.length > 0) {
      // jogador com o amigo
      salvos++;
      somResgate.play();
      reposicionaAmigo();
      $("#amigo").remove();
    }

    if (colisao6.length > 0) {
      //Inimigo2 com o amigo
      perdidos++;
      somPerdido.play();
      amigoX = parseInt($("#amigo").css("left"));
      amigoY = parseInt($("#amigo").css("top"));
      explosao3(amigoX, amigoY);
      $("#amigo").remove();
      reposicionaAmigo();
    }
  }

  function explosao1(inimigo1X, inimigo1Y) {
    $("#fundoGame").append("<div id='explosao1'></div"); //Cria div explosão1 no HTML
    $("#explosao1").css("background-image", "url(imgs/explosao.png)"); //Estiliza explosao1 no CSS
    var div = $("#explosao1"); //cria uma variável cujo valor é #explosao1, para agilizar
    div.css("top", inimigo1Y); //define a posição da div explosao1 como a mesma da div do inimigo1
    div.css("left", inimigo1X);
    div.animate({ width: 300, opacity: 0 }, "slow"); // Função do JQyery, que cria uma animação que aumenta o tamanho da div até o maximo de 200, numa velocidade devagar

    var tempoExplosao = window.setInterval(removeExplosao, 1000);

    function removeExplosao() {
      //remove a div explosao1
      div.remove();
      window.clearInterval(tempoExplosao);
      tempoExplosao = null;
    }
  }

  function explosao2(inimigo2X, inimigo2Y) {
    $("#fundoGame").append("<div id='explosao2'></div");
    $("#explosao2").css("background-image", "url(imgs/explosao.png)");
    var div2 = $("#explosao2");
    div2.css("top", inimigo2Y);
    div2.css("left", inimigo2X);
    div2.animate({ width: 200, opacity: 0 }, "slow");

    var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

    function removeExplosao2() {
      div2.remove();
      window.clearInterval(tempoExplosao2);
      tempoExplosao2 = null;
    }
  }

  function reposicionaInimigo2() {
    var tempoColisao4 = window.setInterval(reposiciona4, 5000); //cria variavel para chamar a função reposiciona4 em  um intervalo de 5 segundos após a colisao
    function reposiciona4() {
      window.clearInterval(tempoColisao4);
      tempoColisao4 = null;
      if (fimDeJogo == false) {
        $("#fundoGame").append("<div id=inimigo2></div"); //define que a div inimigo2 só sera recriada se a variável fimDeJogoejogo==false, para que o inimigo não seja recriado com o jogo finalizado.
      }
    }
  }

  function reposicionaAmigo() {
    var tempoAmigo = window.setInterval(reposiciona6, 6000);
    function reposiciona6() {
      window.clearInterval(tempoAmigo);
      tempoAmigo = null;
      if (fimDeJogo == false) {
        $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
      }
    }
  }

  function explosao3(amigoX, amigoY) {
    $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
    $("#explosao3").css("top", amigoY);
    $("#explosao3").css("left", amigoX);
    var tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);
    function resetaExplosao3() {
      $("#explosao3").remove();
      window.clearInterval(tempoExplosao3);
      tempoExplosao3 = null;
    }
  }

  function placar() {
    $("#placar").html(
      "<h2> Pontos: " +
        pontos +
        " Salvos: " +
        salvos +
        " Perdidos: " +
        perdidos +
        "</h2>"
    );
  }

  function energia() {
    if (energiaAtual == 3) {
      $("#energia").css("background-image", "url(imgs/energia3.png)");
    }
    if (energiaAtual == 2) {
      $("#energia").css("background-image", "url(imgs/energia2.png)");
    }
    if (energiaAtual == 1) {
      $("#energia").css("background-image", "url(imgs/energia1.png)");
    }

    if (energiaAtual == 0) {
      $("#energia").css("background-image", "url(imgs/energia0.png)");
    }

    if (energiaAtual < 0) {
      gameOver();
    }
  }

  function gameOver() {
    //Finaliza jogo
    fimdejogo = true;
    musica.pause();
    somGameover.play();

    window.clearInterval(jogo.timer); //Interrompe gameloop
    jogo.timer = null;

    $("#jogador").remove();
    $("#inimigo1").remove();
    $("#inimigo2").remove();
    $("#amigo").remove();

    $("#fundoGame").append("<div id='fim'></div>");

    $("#fim").html(
      "<h1> Game Over </h1><p>Sua pontuação foi: " +
        pontos +
        "</p>" +
        "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>"
    );
  }
}

function reiniciaJogo() {
  somGameover.pause();
  $("#jogador").remove();
  $("#inimigo1").remove();
  $("#inimigo2").remove();
  $("#amigo").remove();
  $("#fim").remove();
  start();
}
