const hist = document.querySelector('ul#historico')
const palptxt = document.querySelector('input#palpite')
const feedtxt = document.querySelector('p#feedback')
const tentxt = document.querySelector('p#tentativas')
const botaoadv = document.querySelector('button#adv')
const botaonew = document.querySelector('button#newg')
const toastDiv = document.querySelector('div#toast')
let pc = Math.floor(Math.random() * 100) + 1;
let tentativas = 10
let endGame = false //controla se o jogo está ativo

botaoadv.addEventListener('click', adivinhar)
botaonew.addEventListener('click', novoJogo)

palptxt.addEventListener('keydown', function (event) { //evento enter no campo de palpite chama adivinhar()
    if (event.key === 'Enter') {
        if (!endGame) {
            adivinhar()
        }
    }
})


const audio = new Audio('../assets/azazel-cant-stop-coming.mp3');
audio.loop = true;   // repetir infinitamente
audio.volume = 0.5;  // volume inicial (0 a 1)

let musicaAtiva = true;

// Tenta tocar assim que carrega
window.onload = function () {
    audio.play().then(() => {
        //console.log("Reprodução automática iniciada!");
    }).catch(error => {
        //console.log("Autoplay bloqueado pelo navegador. Aguardando interação.");

        // Se bloqueado, adiciona um evento de clique para tocar
        document.addEventListener('click', () => {
            audio.play();
            //console.log('reprodução iniciada manualmente')
        }, { once: true }); // Executa apenas uma vez
    });
};

// Vincular ao botão
const btn = document.getElementById('toggle-music');
btn.addEventListener('click', () => {
    if (musicaAtiva) {
        audio.pause();
        btn.innerHTML = '&#x1F507'; // emoji silenciado
    } else {
        audio.play();
        btn.innerHTML = '&#x1F50A'; // emoji volume alto
    }
    musicaAtiva = !musicaAtiva;
});


botaonew.disabled = true
botaonew.style.display = 'none' //esconde o botão - 'none' esconde - 'block' mostra


function createCloud() { // função cria nuvens
  const sky = document.getElementById('sky');
  const cloud = document.createElement('div');
  cloud.className = 'cloud';
  
  // Tamanhos e posições aleatórias
  const size = Math.random() * 150 + 100;
  cloud.style.width = `${size}px`;
  cloud.style.height = `${size * 0.6}px`;
  cloud.style.top = `${Math.random() * 50}%`; // Nuvens na parte superior
  cloud.style.left = `-200px`; // Começa fora da tela à esquerda

  sky.appendChild(cloud);

  // Animação com JS
  let position = -200;
  const speed = Math.random() * 1 + 0.5; // Velocidades variadas

  function move() {
    position += speed;
    cloud.style.left = `${position}px`;

    if (position < window.innerWidth) {
      requestAnimationFrame(move);
    } else {
      cloud.remove(); // Remove ao sair da tela para poupar memória
    }
  }

  move();
}

// Cria uma nova nuvem a cada 3 segundos
setInterval(createCloud, 3000);


function adivinhar() {
    let horario = new Date()
    let hora = horario.getHours()
    let minuto = horario.getMinutes()
    let segundo = horario.getSeconds()
    let palpnum = Number(palptxt.value)
    let lista = document.querySelector('ul#historico');
    let liHistorico = document.createElement('li')
    let imgCongelando = `<img src="./assets/congelando-100.png" alt="img congelando">`
    let imgMorno = `<img src="./assets/medio-100.png" alt="img morno">`
    let imgFogo = `<img src="./assets/pegando-fogo-100.png" alt="img pegando fogo">`
    let msgToast


    if (tentativas == 0) {
        tentativas = false
    }

    if (palpnum < 1 || palpnum > 100) { // se o número não estiver entre 1 e 100
        alert('Digite um número entre 1 e 100 para iniciar!')
    } else if (tentativas) { // se ainda existir tentativas será feito os testes

        palptxt.classList.add('pulsar') // pulsar no input

        // maior
        if (palpnum > (pc + 10)) { // palpite com diferença de +10 positivo - congelando
            tentativas -= 1
            feedtxt.innerHTML = `Tá Congelando! ${imgCongelando}`
            msgToast = 'Tá Congelando!'
        } else if (palpnum >= (pc + 5) && palpnum <= (pc + 10)) { // palpite com diferença entre 10 e 5 positivo - morno
            tentativas -= 1
            feedtxt.innerHTML = `Tá Morno! ${imgMorno}`
            msgToast = 'Tá Morno!'
        } else if (palpnum >= (pc + 1) && palpnum <= (pc + 4)) { // palpite com diferença entre 4 e 1 positivo - pegando fogo
            tentativas -= 1
            feedtxt.innerHTML = `Tá Pegando Fogo! ${imgFogo}`
            msgToast = 'Tá Pegando Fogo!'
        }

        // historico
        if (palpnum > pc) { // palpite alto
            //hist.innerHTML += `<li>&#x2B06 ${palpnum} (alto)</li>`
            liHistorico.innerHTML = `&#x2B06 ${palpnum} (alto)`
        } else if (palpnum < pc) { // palpite baixo
            //hist.innerHTML += `<li>&#x2B07 ${palpnum} (baixo)</li>`
            liHistorico.innerHTML = `&#x2B07 ${palpnum} (baixo)`
        }

        // menor
        if (palpnum < (pc - 10)) { // palpite com diferença de -10 negativo - congelando
            tentativas -= 1
            feedtxt.innerHTML = `Tá Congelando! ${imgCongelando}`
            msgToast = 'Tá Congelando!'
        } else if (palpnum <= (pc - 5) && palpnum >= (pc - 10)) { // palpite com diferença entre 10 e 5 negativo - morno
            tentativas -= 1
            feedtxt.innerHTML = `Tá Morno! ${imgMorno}`
            msgToast = 'Tá Morno!'
        } else if (palpnum <= (pc - 1) && palpnum >= (pc - 4)) { // palpite com diferença entre 4 e 1 negativo - pegando fogo
            tentativas -= 1
            feedtxt.innerHTML = `Tá Pegando Fogo! ${imgFogo}`
            msgToast = 'Tá Pegando Fogo!'
        }

        if (palpnum == pc) {
            // acertou - ganhou
            feedtxt.innerHTML = "Parabéns, você conseguiu acertar o número secreto! &#x1F389;&#x1F389;&#x1F389;"
            msgToast = "Parabéns, você Ganhou! &#x1F389;&#x1F389;&#x1F389;"
            liHistorico.innerHTML = `&#x2705 ${palpnum} (acertou!) - ${hora}:${minuto}:${segundo}&#x1F60E;`
            botaoadv.disabled = true
            botaonew.disabled = false
            botaonew.style.display = 'block' //mostra o botão new game
            botaoadv.style.display = 'none' //esconde o botão adv
            endGame = true //acabou o jogo
        }
        if (tentativas == 0) {
            // acabou as tentativas - perdeu
            botaoadv.disabled = true
            botaonew.disabled = false
            botaonew.style.display = 'block'
            botaoadv.style.display = 'none'
            feedtxt.innerHTML = "Ah que pena, dessa vez o pc venceu, que tal tentar novamente? &#x1F614;"
            msgToast = "Ah que pena, dessa vez o pc venceu &#x1F614;"
            tentxt.innerHTML = `Tentativas restantes: 0`
            liHistorico.innerHTML = `&#x274C O número secreto era: ${pc}`
            endGame = true //acabou o jogo
        }
        hist.appendChild(liHistorico)
        liHistorico.classList.add('novo-item')
        lista.scrollIntoView({ behavior: 'smooth', block: 'end' }); // sempre rola a lista historico para baixo
        tentxt.innerHTML = `Tentativas restantes: ${tentativas}`
        toastDiv.innerHTML = msgToast
        toastDiv.classList.add('show')
    }

    setTimeout(() => {
        palptxt.classList.remove('pulsar')
        toastDiv.classList.remove('show')
        liHistorico.classList.remove('novo-item')
    }, 1500);

}

function novoJogo() {
    pc = Math.floor(Math.random() * 100) + 1;
    tentativas = 10
    tentxt.innerHTML = "Tentativas restantes: 10"
    feedtxt.innerHTML = "Novo Jogo iniciou, pode fazer seu palpite! &#x1F47E;"
    toastDiv.innerHTML = "Novo Jogo iniciou! &#x1F47E;"
    toastDiv.classList.add('show')
    botaoadv.disabled = false
    botaonew.disabled = true
    botaonew.style.display = 'none'
    botaoadv.style.display = 'block'
    endGame = false

    setTimeout(() => {
        toastDiv.classList.remove('show')
    }, 1000);
}
