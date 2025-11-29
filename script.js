const sel = document.querySelector('select#historico')
const palptxt = document.querySelector('input#palpite')
const feedtxt = document.querySelector('p#feedback')
const tentxt = document.querySelector('p#tentativas')
const botaoadv = document.querySelector('input#adv')
const botaonew = document.querySelector('input#newg')
let pc = Math.floor(Math.random() * 100) + 1;
let tentativas = 10

botaonew.disabled = true

function Adivinhar() {
    let horario = new Date()
    let hora = horario.getHours()
    let minuto = horario.getMinutes()
    let segundo = horario.getSeconds()
    let palpnum = Number(palptxt.value)
    
    if (palpnum < 1 || palpnum > 100) {
        alert('Digite um número entre 1 e 100 para iniciar!')
    } else {
        tentativas -= 1
        tentxt.innerHTML = `Tentativas restantes: ${tentativas}`
        if (palpnum > pc) {
            feedtxt.innerHTML = "Ops, seu palpite foi alto, tente um número mais baixo...&#x2B07;"
        } else if (palpnum < pc) {
            feedtxt.innerHTML = "Ops, seu palpite foi baixo, tente um número mais alto...&#x2B06;"
        } else {
            // acertou
            feedtxt.innerHTML = "Parabéns, você conseguiu acertar o número secreto! &#x1F389;&#x1F389;&#x1F389;"
            sel.innerHTML += `<option>Jogador ganhou a partida às ${hora}:${minuto}:${segundo}&#x1F60E;</option>`
            botaoadv.disabled = true
            botaonew.disabled = false
        }
        if (tentativas == 0) {
            // acabou as tentativas
            feedtxt.innerHTML = "Ah que pena, dessa vez o pc venceu, que tal tentar novamente? &#x1F614;"
            sel.innerHTML += `<option>Jogador perdeu a partida às ${hora}:${minuto}:${segundo}&#x1F614;</option>`
            botaoadv.disabled = true
            botaonew.disabled = false
        }
    }

    //sel.innerHTML += `<option>User clicou em ${hora}:${minuto}:${segundo}</option>`
}

function NovoJogo() {
    pc = Math.floor(Math.random() * 100) + 1;
    tentativas = 10
    tentxt.innerHTML = "Tentativas restantes: 10"
    feedtxt.innerHTML = "Novo Jogo iniciou, pode fazer seu palpite! &#x1F47E;"
    botaoadv.disabled = false
    botaonew.disabled = true
}
