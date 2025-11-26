const sel = document.querySelector('select#historico')
const palptxt = document.querySelector('input#palpite')
const feedtxt = document.querySelector('p#feedback')
const tentxt = document.querySelector('p#tentativas')
let pc = Math.floor(Math.random() * 100) + 1;
let tentativas = 10

function Adivinhar() {
    let horario = new Date()
    let hora = horario.getHours()
    let minuto = horario.getMinutes()
    let segundo = horario.getSeconds()
    let palpnum = Number(palptxt.value)
    
    console.log('o numero secreto é: '+pc)
    if (palpnum < 1 || palpnum > 100) {
        alert('Digite um número entre 1 e 100 para iniciar!')
    } else {
        while (palpnum != pc || tentativas != 0) {
            tentativas -= 1
            tentxt.innerHTML = `Tentativas restantes: ${tentativas}`
            if (palpnum > pc) {
                feedtxt.innerHTML = "Ops, seu palpite foi alto, tente um número mais baixo...&#x2B07;"
                break
            } else if (palpnum < pc) {
                feedtxt.innerHTML = "Ops, seu palpite foi baixo, tente um número mais alto...&#x2B06;"
                break
            }
        }
        if (palpnum == pc) {
            feedtxt.innerHTML = "Parabéns, você conseguiu acertar o número secreto! &#x1F389;&#x1F389;&#x1F389;"
        } else {
            feedtxt.innerHTML = "Ah que pena, dessa vez o pc venceu, que tal tentar novamente? &#x1F614;"
        }
    }

    //sel.innerHTML += `<option>User clicou em ${hora}:${minuto}:${segundo}</option>`
}

function NovoJogo() {
    pc = Math.floor(Math.random() * 100) + 1;
    console.log('novoJogo definiu como: '+pc)
}
