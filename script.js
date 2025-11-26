const sel = document.querySelector('select#historico')
const palptxt = document.querySelector('input#palpite')
let pc = Math.floor(Math.random() * 100) + 1;

function Adivinhar() {
    let horario = new Date()
    let hora = horario.getHours()
    let minuto = horario.getMinutes()
    let segundo = horario.getSeconds()
    let palpnum = Number(palptxt.value)
    
    console.log(pc)
    if (palpnum < 1 || palpnum > 100) {
        alert('Digite um número entre 1 e 100 para iniciar!')
    } else {
        console.log('perai')
    }

    //sel.innerHTML += `<option>User clicou em ${hora}:${minuto}:${segundo}</option>`
}

function NovoJogo() {
    let pc = Math.floor(Math.random() * 100) + 1;
    console.log(pc)
}
