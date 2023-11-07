const pecas = ['torre', 'cavalo', 'bispo', 'rainha', 'rei', 'peaoTimeA', 'peaoTimeB'];
const colunas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const linhas = ['1', '2', '3', '4', '5', '6', '7', '8'];

const funcoesDeMovimento = {
    'torre': movimentosTorre,
    'cavalo': movimentosCavalo,
    'bispo': movimentosBispo,
    'rainha': movimentosRainha,
    'rei': movimentosRei,
    'peaoTimeA': movimentosPeaoTimeA,
    'peaoTimeB': movimentosPeaoTimeB
}

const posicaotabuleiro = document.querySelectorAll('.posicao');

for (let i = 0; i < posicaotabuleiro.length; i++) {
    const posicao = posicaotabuleiro[i];

    posicao.addEventListener('click', function () {
        for (let j = 0; j < posicaotabuleiro.length; j++) {
            posicaotabuleiro[j].classList.remove('destacar');
        }
        posicao.classList.add('destacar');

        const peca = posicao.querySelector('svg');
        reconhecerPecaClicada(peca, posicao);
    });

}


function reconhecerPecaClicada(peca, posicao) {
    const idPosicao = posicao.id;
    var coluna = 0;
    var linha = 0;

    for (let i = 0; i < colunas.length; i++) {
        if (idPosicao.includes(colunas[i])) {
            coluna = colunas[i];
        }
    }

    for (let i = 0; i < linhas.length; i++) {
        if (idPosicao.includes(linhas[i])) {
            linha = linhas[i];
        }
    }

    for (let i = 0; i < pecas.length; i++) {
        if (peca != null && peca.classList.contains(pecas[i])) {
            console.log(pecas[i]);
            funcoesDeMovimento[pecas[i]](posicao, coluna, linha);
        }
    }
}

function movimentosTorre(posicaoOrigem, coluna, linha) {
}

function movimentosCavalo(posicaoOrigem, coluna, linha) {

}

function movimentosBispo(posicaoOrigem, coluna, linha) {
}

function movimentosRainha(posicaoOrigem, coluna, linha) {

}

function movimentosRei(posicaoOrigem, coluna, linha) {

}

function movimentosPeaoTimeA(posicaoOrigem, coluna, linha) {

    for (let i = 0; i < posicaotabuleiro.length; i++) {
        const posicao = posicaotabuleiro[i];
        let idPosicao = posicao.id;
        if (linha == 2) {
            if (idPosicao.includes(coluna+3) || idPosicao.includes(coluna+4)){
                posicao.classList.add('movimento');
            }
        }else {
            if (idPosicao.includes(coluna+(parseInt(linha)+1))){
                posicao.classList.add('movimento');
            }
        }
    }
    validarMovimento(posicaoOrigem);
}

function movimentosPeaoTimeB(posicaoOrigem, coluna, linha) {
    for (let i = 0; i < posicaotabuleiro.length; i++) {
        const posicao = posicaotabuleiro[i];
        let idPosicao = posicao.id;
        if (linha == 7) {
            if (idPosicao.includes(coluna+6) || idPosicao.includes(coluna+5)){
                posicao.classList.add('movimento');
            }
        }else {
            if (idPosicao.includes(coluna+(parseInt(linha)-1))){
                posicao.classList.add('movimento');
            }
        }
    }
    validarMovimento(posicaoOrigem);
}


function validarMovimento(posicaoOrigem) {
    let movimentoRealizado = false;

    for (let i = 0; i < posicaotabuleiro.length; i++) {
        const posicao = posicaotabuleiro[i];

        posicao.addEventListener('click', function () {
            if (!movimentoRealizado) {
                var destino = posicaotabuleiro[i];
                var destinoOcupado = destino.querySelector('svg');

                //movimentar para o mesmo lugar || posição ocupada || movimento inválido
                if (destino == posicaoOrigem || destinoOcupado != null || !destino.classList.contains('movimento')) {
                    console.log('Movimento inválido');
                    movimentoRealizado = true;
                    limparTabuleiro();
                } else {
                    moverPeca(posicaoOrigem, destino);
                    movimentoRealizado = true;
                    limparTabuleiro();
                }
            }
        });

        if (movimentoRealizado) {
            break;
        }
    }
}


function limparTabuleiro() {
    for (let i = 0; i < posicaotabuleiro.length; i++) {
        posicaotabuleiro[i].classList.remove('movimento');
        posicaotabuleiro[i].classList.remove('destacar');
    }
}


function moverPeca(origem, destino) {
    const peca = origem.querySelector('svg');
    destino.appendChild(peca);
}