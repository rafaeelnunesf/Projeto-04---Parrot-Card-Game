const gifs = ["bobrossparrot.gif","explodyparrot.gif","fiestaparrot.gif","metalparrot.gif","revertitparrot.gif","tripletsparrot.gif","unicornparrot.gif"]

let numeroDeCartasViradas = 0 //OK
let arrayCartas = [] //OK
let numeroDeCartasComPar = 0 //OK
let jogadas = 0

function QuantidadeDeCartas(){
    const numeroDeCartas = prompt("Com quantas cartas você quer jogar?")

    const divisao = numeroDeCartas % 2;
    if(numeroDeCartas >= 4 && numeroDeCartas <= 14 && divisao === 0){
        CriarCartas(numeroDeCartas)
    }else{
        QuantidadeDeCartas()
    }  
}

function CriarCartas(numeroDeCartas) {
    const elemento = document.querySelector(".cards");
    const novaOrdemDeCartas = embaralharCartas(numeroDeCartas);
    for(let i =0;i<numeroDeCartas;i++){
        elemento.innerHTML += 
        `<div class="card" data-identifier="card" onclick="regrasDeJogo(this)">
            <div class="front-face face" data-identifier="front-face"></div>            
            <div class="back-face face" data-identifier="back-face">
                <img src="/Images/${novaOrdemDeCartas[i]}" style="width:80px">
            </div>            
        </div>`
    }
}

function embaralharCartas(numeroDeCartas) {
    const array= gifs.sort(comparador); // Após esta linha, as cartas estarão embaralhada
    const cartas = array.slice(0,numeroDeCartas/2) //Pega a metade da quantidade de cartas selecionadas
    const Pares = cartas.concat(cartas); //gera os pares de cartas
    const novaOrdemDeCartas = Pares.sort(comparador) //embaralha novamente as cartas
    return novaOrdemDeCartas
}
// Esta função pode ficar separada do código acima, onde você preferir
function comparador() { 
	return Math.random() - 0.5; 
}
function regrasDeJogo(carta) {
    jogadas++
    cartasSemPar = numeroDeCartasViradas - numeroDeCartasComPar

    const gif = `"${carta.childNodes[3].childNodes[1].currentSrc}"`
    arrayCartas.push(gif)

    virarCartas(carta,numeroDeCartasViradas)
    verificarSeSaoIguais(arrayCartas)
}


function virarCartas(carta) {
    if(numeroDeCartasViradas===0){
        carta.classList.add("virada")
        numeroDeCartasViradas++
    }else if(numeroDeCartasViradas===1){
        carta.classList.add("virada")
        numeroDeCartasViradas++
    }
}
function verificarSeSaoIguais(arrayCartasviradas){
    if(arrayCartasviradas[0]===arrayCartasviradas[1]){    
        colocarClassePar()
    }else if(arrayCartasviradas[0]!==arrayCartasviradas[1] && arrayCartasviradas[0] !== undefined && arrayCartasviradas[1]!== undefined){
        setTimeout(tirarClasseVirada,1000);
    }
}
function colocarClassePar() {
    const pares = document.querySelectorAll(".virada")
    for(let i= 0;i<pares.length;i++){
        pares[i].classList.add("par")
        arrayCartas = []
        numeroDeCartasViradas = 0
        numeroDeCartasComPar++
        numeroDeCartasComPar++
    }
}
function tirarClasseVirada() {
    const pares = document.querySelectorAll(".virada")
     for(let i =0;i<pares.length;i++){
        pares[i].classList.remove("virada")
        numeroDeCartasViradas = 0
        arrayCartas = []
    }
}






QuantidadeDeCartas()