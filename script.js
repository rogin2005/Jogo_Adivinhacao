let numeroSecreto;
let tentativas = 0;
let maxTentativas = 5;
const limite = 5;

function iniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    tentativas = 0
    document.getElementById('inicio').innerHTML = 'O jogo iniciou pode fazer seu palpite...'
    document.getElementById('resultado').innerHTML = '';
}

function advinharNumero() {
    const palpite = parseInt(document.getElementById('palpite').value);

    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        alert('Por favor, insira um número válido entre 1 e 100.');
        return;
    }

    if (numeroSecreto === undefined) {
        alert('Ops, vc não clicou em Iniciar Jogo...')
        window.location.reload()
    }

    tentativas++;
    maxTentativas--;

    document.getElementById('ja_usou').innerHTML = `Você já usou ${tentativas} tentativa(s)`
    document.getElementById('restam').innerHTML = `Ainda restam ${maxTentativas} tentativa(s)`

    if (palpite === numeroSecreto) {
        document.getElementById('resultado').innerHTML = `Parabéns! Você acertou o número secreto em ${tentativas} tentativas`;
        document.getElementById('botao_adv').disabled = true;
    } else if (tentativas === limite) {
        document.getElementById('resultado').innerHTML = `Suas tentativas acabaram, tente novamente clicando em Jogar novamente. O número secreto era ${numeroSecreto}.`;
        document.getElementById('botao_adv').disabled = true;
    } else if (palpite < numeroSecreto) {
        document.getElementById('resultado').innerHTML = 'O seu palpite está baixo. Tente um número maior.';
    } else {
        document.getElementById('resultado').innerHTML = 'O seu palpite está alto. Tente um número menor.';
    }
    console.log('palpite: '+palpite);
}

function Reiniciar() {
    window.location.reload()
}
