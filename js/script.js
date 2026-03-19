const hist = document.querySelector('ul#historico')
const palptxt = document.querySelector('input#palpite')
const feedtxt = document.querySelector('p#feedback')
const tentxt = document.querySelector('p#tentativas')
const botaoadv = document.querySelector('button#adv')
const botaonew = document.querySelector('button#newg')
let pc = Math.floor(Math.random() * 100) + 1;
let tentativas = 10

botaoadv.addEventListener('click', adivinhar)
botaonew.addEventListener('click', novoJogo)

botaonew.disabled = true

function adivinhar() {
    console.log('numero', pc)
    let horario = new Date()
    let hora = horario.getHours()
    let minuto = horario.getMinutes()
    let segundo = horario.getSeconds()
    let palpnum = Number(palptxt.value)

    if (tentativas == 0) {
        tentativas = false
    }

    if (palpnum < 1 || palpnum > 100) {
        alert('Digite um número entre 1 e 100 para iniciar!')
    } else if (tentativas) {
        /* if (palpnum > pc) { // palpite maior
            feedtxt.innerHTML = "Ops, seu palpite foi alto, tente um número mais baixo...&#x2B07;"
            hist.innerHTML += `<li> </li>`
            tentativas -= 1
        } */

       // maior
        if (palpnum > (pc + 10)) { // palpite com diferença de +10 positivo - congelando
            tentativas -= 1
            feedtxt.innerHTML = `Tá Congelando!`
        } else if (palpnum >= (pc + 5) && palpnum <= (pc + 10)) { // palpite com diferença entre 10 e 5 positivo - morno
            tentativas -= 1
            feedtxt.innerHTML = `Tá Morno!`
        } else if (palpnum >= (pc + 1) && palpnum <= (pc + 4)) { // palpite com diferença entre 4 e 1 positivo - pegando fogo
            tentativas -= 1
            feedtxt.innerHTML = `Tá Pegando Fogo!`
        }

        // historico
        if (palpnum > pc) {
            hist.innerHTML += `<li>&#x2B06 ${palpnum} (alto)</li>`
        } else if (palpnum < pc) {
            hist.innerHTML += `<li>&#x2B07 ${palpnum} (baixo)</li>`
        }

        // menor
        if (palpnum < (pc - 10)) { // palpite com diferença de -10 negativo - congelando
            tentativas -= 1
            feedtxt.innerHTML = `Tá Congelando!`
        } else if (palpnum <= (pc - 5) && palpnum >= (pc - 10)) { // palpite com diferença entre 10 e 5 negativo - morno
            tentativas -= 1
            feedtxt.innerHTML = `Tá Morno!`
        } else if (palpnum <= (pc - 1) && palpnum >= (pc - 4)) { // palpite com diferença entre 4 e 1 negativo - pegando fogo
            tentativas -= 1
            feedtxt.innerHTML = `Tá Pegando Fogo!`
        }

        if (palpnum == pc) {
            // acertou
            feedtxt.innerHTML = "Parabéns, você conseguiu acertar o número secreto! &#x1F389;&#x1F389;&#x1F389;"
            hist.innerHTML += `<li>&#x2705 ${palpnum} (acertou!) - ${hora}:${minuto}:${segundo}&#x1F60E;</li>`
            /* sel.innerHTML += `<option>Ganhou às ${hora}:${minuto}:${segundo}&#x1F60E;</option>` */
            botaoadv.disabled = true
            botaonew.disabled = false

        }
        if (tentativas == 0) {
            // acabou as tentativas
            botaoadv.disabled = true
            botaonew.disabled = false
            feedtxt.innerHTML = "Ah que pena, dessa vez o pc venceu, que tal tentar novamente? &#x1F614;"
            tentxt.innerHTML = `Tentativas restantes: 0`
            hist.innerHTML += `<li>User perdeu!</li>`
            /* sel.innerHTML += `<option>Perdeu às ${hora}:${minuto}:${segundo}&#x1F614;</option>` */
        }
        tentxt.innerHTML = `Tentativas restantes: ${tentativas}`
    }

}

function novoJogo() {
    pc = Math.floor(Math.random() * 100) + 1;
    tentativas = 10
    tentxt.innerHTML = "Tentativas restantes: 10"
    feedtxt.innerHTML = "Novo Jogo iniciou, pode fazer seu palpite! &#x1F47E;"
    botaoadv.disabled = false
    botaonew.disabled = true
}
