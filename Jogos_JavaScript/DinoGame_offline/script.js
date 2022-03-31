const dino = document.querySelector(".dino");
const background = document.querySelector(".background");

let isJumping = false;
let position = 0;

//Função que chama a função jump quando  detecta que a tecla 'espaço' foi acionada
function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      //Só pulará se a variavel isJumping for negativa.
      jump();
      createCactus();
    }
  }
}

// Função que faz com que o dino pule.
function jump() {
  isJumping = true; //muda a variável para positivo
  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);

      //Desce
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
      //Sobe
      position += 20; //pega o valor da posição atual e adiciona 20 uinidades.
      dino.style.bottom = position + "px";
    }
  }, 20); //executa o código a cada 20 milisegundos
}

//Criando os Cactus:
function createCactus() {
  const cactus = document.createElement("div");
  let cactusPosition = 1000; //Posiciona Cactus inicialmente à direita da tela.
  let randomTime = Math.random() * 6000;

  cactus.classList.add("cactus");
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + "px";

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      //Sai da tela
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 55 && position < 55) {
      //Determina colisao. Esse é o espaço do Dino
      //GameOver
      clearInterval(leftInterval);
      document.body.innerHTML = '<h1 class="gameOver">Game Over</h1>';
    } else {
      cactusPosition -= 8;
      cactus.style.left = cactusPosition + "px";
    }
  }, 20);
  setTimeout(createCactus, randomTime);
}

//Chama a função handleKeyUp se o evento (clique) acontece.
document.addEventListener("keyup", handleKeyUp);
