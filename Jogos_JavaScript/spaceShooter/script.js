const playerShip = document.querySelector(".playerShip");
const playArea = document.querySelector("#mainPlayArea");
const aliensImg = [
  "img/monster-1.png",
  "img/monster-2.png",
  "img/monster-3.png",
];

//Função que define comportamento da nave à partir dos comandos do usuário para movimento e disparo .
function flyShip(event) {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    moveUp();
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    moveDown();
  } else if (event.key === " ") {
    event.preventDefault();
    fireLaser();
  }
}

//Movimento para cima
function moveUp() {
  let topPosition = getComputedStyle(playerShip).getPropertyValue("top"); //Pega o valor da propriedade Top atual da nave
  if (topPosition === "0px") {
    //limite da tela
    return;
  } else {
    let position = parseInt(topPosition);
    position -= 50;
    playerShip.style.top = `${position}px`;
  }
}

//Movimento para baixo
function moveDown() {
  let topPosition = getComputedStyle(playerShip).getPropertyValue("top");
  if (topPosition >= "600px") {
    return;
  } else {
    let position = parseInt(topPosition);
    position += 50;
    playerShip.style.top = `${position}px`;
  }
}

//Disparos

//Inicia processo
function fireLaser() {
  let laser = createLaserElement();
  playArea.appendChild(laser);
  moveLaser(laser);
}

//Cria elemento Laser
function createLaserElement() {
  let xPosition = parseInt(
    window.getComputedStyle(playerShip).getPropertyValue("left")
  );
  let yPosition = parseInt(
    window.getComputedStyle(playerShip).getPropertyValue("top")
  );
  let newLaser = document.createElement("img");
  newLaser.src = "img/shoot.png";
  newLaser.classList.add("laser");
  newLaser.style.left = `${xPosition}px`;
  newLaser.style.top = `${yPosition - 10}px`;
  return newLaser;
}

//Determina movimentação do disparo
function moveLaser(laser) {
  let laserInterval = setInterval(() => {
    let xPosition = parseInt(laser.style.left);
    let aliens = document.querySelectorAll(".alien");

    aliens.forEach((alien) => {
      //verifica se houve colisão entre laser e alien e troca imagem de alien por explosão, caso positivo
      if (checkLaserCollision(laser, alien)) {
        alien.src = "img/explosion.png";
        alien.classList.remove("alien");
        alien.classList.add("deadAlien");
      }
    });

    if (xPosition === 340) {
      laser.remove();
    } else {
      laser.style.left = `${xPosition + 8}px`;
    }
  }, 10);
}

//Seleciona aleatoriamente a imagem da nave alienigena e cria um elemento img com ela.
function createAliens() {
  let newAlien = document.createElement("img");
  let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]; //Seleciona imagem randomicamente
  newAlien.src = alienSprite;
  newAlien.classList.add("alien");
  newAlien.classList.add("alienTransition");
  newAlien.style.left = "370px";
  newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}`;
  playArea.appendChild(newAlien);
  moveAlien(newAlien);
}

//Movimenta inimigos
function moveAlien(alien) {
  let moveAlienInterval = setInterval(() => {
    let xPosition = parseInt(
      window.getComputedStyle(alien).getPropertyValue("left")
    );
    if (xPosition <= 50) {
      if (Array.from(alien.classList).includes("deadAlien")) {
        alien.remove();
      } else {
        //gameOver();
      }
    } else {
      alien.style.left = `${xPosition - 4}px`;
    }
  }, 30);
}

//Verifica colisão
function checkLaserCollision(laser, alien) {
  let laserTop = parseInt(laser.style.top);
  let laserLeft = parseInt(laser.style.left);
  let laserBottom = laserTop - 20;
  let alienTop = parseInt(alien.style.top);
  let alienLeft = parseInt(alien.style.left);
  let alienBottom = alienTop - 30;
  if (laserLeft != 340 && laserLeft + 40 >= alienLeft) {
    if (laserTop <= alienTop && laserTop >= alienBottom) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

window.addEventListener("keydown", flyShip);
createAliens();
