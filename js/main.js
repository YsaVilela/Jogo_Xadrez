const pecas = ['torre', 'cavalo', 'bispo', 'rainha', 'rei', 'peao'];
const colunas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const linhas = ['1', '2', '3', '4', '5', '6', '7', '8'];

const funcoesDeMovimento = {
    'torre': movimentosTorre,
    'cavalo': movimentosCavalo,
    'bispo': movimentosBispo,
    'rainha': movimentosRainha,
    'rei': movimentosRei,
    'peao': movimentosPeao
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
            funcoesDeMovimento[pecas[i]](posicao, coluna, linha);
            console.log(pecas[i]);
        }
    }
}

function movimentosTorre(posicaoOrigem, coluna, linha) {
    let movimentoRealizado = false;

    //enviar o movimento
    for (let i = 0; i < posicaotabuleiro.length; i++) {
        const posicao = posicaotabuleiro[i];

        posicao.addEventListener('click', function () {
            if (!movimentoRealizado) {
                var destino = posicaotabuleiro[i];
                moverPeca(posicaoOrigem, destino);
                movimentoRealizado = true;
            }
        });

        if (movimentoRealizado){
            break;
        }
    }
}


function moverPeca(origem, destino) {

    var destinoVazio = destino.querySelector('svg');
    if (destinoVazio != null) {
        console.log("Não é possivel realizar este movimento");
    } else if (origem == destino) {
        console.log("A peça não se moveu");
    } else {
        const peca = origem.querySelector('svg');
        destino.appendChild(peca);
        destino.classList.remove('destacar');
    }
}


function movimentosCavalo(posicaoOrigem, coluna, linha) {

}

function movimentosBispo(posicaoOrigem, coluna, linha) {
}

function movimentosRainha(posicaoOrigem, coluna, linha) {

}

function movimentosRei(posicaoOrigem, coluna, linha) {

}

function movimentosPeao(posicaoOrigem, coluna, linha) {

}