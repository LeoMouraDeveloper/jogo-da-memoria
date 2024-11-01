const emojis = [
    "👀", "👀", "🤔", "🤔", "😆", "😆", "😉", "😉",
    "💖", "💖", "🌹", "🌹", "🥵", "🥵", "🤡", "🤡",
    "🎃", "🎃", "⚽", "⚽", "♠", "♠", "♣", "♣",
    "♦", "♦", "♥", "♥", "🧨", "🧨"
];

let cartaAberta = [];
let resultado = 0;
let pontos = document.querySelector("#pontos");
let tempoAtual = 60;
const tempoRestante = document.querySelector("#time-left");
let intervalo = 0;

function embaralharEmojis() {
    return emojis.sort(() => (Math.random() > 0.5 ? 1 : -1));
}

function iniciarContagem() {
    tempoAtual = 60;
    tempoRestante.textContent = tempoAtual;

    clearInterval(intervalo);
    
    document.querySelector("#mensagemVitoria").style.display = "none";
    document.querySelector("#mensagemDerrota").style.display = "none";

    const gameContainer = document.querySelector(".game");
    gameContainer.innerHTML = ""; 

    const embaralhaEmojis = embaralharEmojis(); 

    for (let i = 0; i < emojis.length; i++) {
        let box = document.createElement("div");
        box.className = "item";
        box.innerHTML = embaralhaEmojis[i];
        box.onclick = clicar;
        gameContainer.appendChild(box);
    }

    intervalo = setInterval(contagem, 1000);
}

function contagem() {
    tempoAtual--;
    tempoRestante.textContent = tempoAtual;

    if (tempoAtual <= 0) {
        clearInterval(intervalo);
        const fimDoJogo = document.getElementById("mensagemDerrota");
        fimDoJogo.innerHTML = "Game Over!!! 👻👻👻";
        fimDoJogo.style.display = "block";

        const itens = document.querySelectorAll(".item");
        itens.forEach(card => card.remove());
    }
}

function clicar() {
    if (cartaAberta.length < 2 && !this.classList.contains("boxMatch") && !this.classList.contains("boxOpen")) {
        this.classList.add("boxOpen");
        cartaAberta.push(this);
    }

    if (cartaAberta.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    if (cartaAberta[0].innerHTML === cartaAberta[1].innerHTML) {
        cartaAberta[0].classList.add("boxMatch");
        cartaAberta[1].classList.add("boxMatch");
        resultado++;
        pontos.textContent = resultado;
    } else {
        cartaAberta[0].classList.remove("boxOpen");
        cartaAberta[1].classList.remove("boxOpen");
    }

    cartaAberta = [];

    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        clearInterval(intervalo);
        const fimDoJogo = document.getElementById("mensagemVitoria");
        fimDoJogo.innerHTML = "Você Venceu !!! 🎉🎉🎉";
        fimDoJogo.style.display = "block";

        const itens = document.querySelectorAll(".item");
        itens.forEach(card => card.remove());
    }
}

document.getElementById("iniciar").onclick = iniciarContagem;
