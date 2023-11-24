const colunas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const linhas = ['1', '2', '3', '4', '5', '6', '7', '8'];
const times = ['timeA', 'timeB'];


const tabuleiro = document.querySelector('.tabuleiro');
const posicaotabuleiro = document.querySelectorAll('.posicao');

let jogadorAtual = 'timeA'; // Comece com o jogador 'time A'

let pecaEscolhida = false;


tabuleiro.onclick = function (event) {
    var elementoClicado = event.target;

    if (!pecaEscolhida) {
        if (elementoClicado.classList.contains('peca')) {
            if (elementoClicado.classList.contains(jogadorAtual)) {
                const posicao = elementoClicado.parentNode;
                limparTabuleiro();
                posicao.classList.add('destacar')
                switch (true) {
                    case elementoClicado.classList.contains('cavalo'):
                        movimentoCavalo(posicao);
                        pecaEscolhida = true;
                        break;
                    case elementoClicado.classList.contains('torre'):
                        movimentoTorre(posicao);
                        pecaEscolhida = true;
                        break;
                    case elementoClicado.classList.contains('bispo'):
                        movimentoBispo(posicao);
                        pecaEscolhida = true;
                        break;
                    case elementoClicado.classList.contains('rei'):
                        movimentoRei(posicao);
                        pecaEscolhida = true;
                        break;
                    case elementoClicado.classList.contains('rainha'):
                        movimentoRainha(posicao);
                        pecaEscolhida = true;
                        break;
                    case elementoClicado.classList.contains('peao'):
                        movimentoPeao(posicao);
                        pecaEscolhida = true;
                        break;
                    default:
                        console.log('Peça não identificada');
                }
            }
        }
    } else {
        if (elementoClicado.classList.contains('peca')) {
            const posicao = elementoClicado.parentNode;
            movimentarPeca(posicao);
        } else {
            movimentarPeca(elementoClicado);
        }
        pecaEscolhida = false;
    }
};

function limparTabuleiro() {
    for (let j = 0; j < posicaotabuleiro.length; j++) {
        posicaotabuleiro[j].classList.remove('destacar');
        posicaotabuleiro[j].classList.remove('movimento');
        posicaotabuleiro[j].classList.remove('captura');
    }
}

function movimentoCavalo(posicao) {
    const [colunaOrigem, linhaOrigem] = posicao.id;

    const movimentosPossivelCavalo = [];

    const movimentosRelativos = [
        [-2, -1],
        [-2, +1],
        [-1, -2],
        [-1, +2],
        [+1, -2],
        [+1, +2],
        [+2, -1],
        [+2, +1]
    ];

    for (const [deltaColuna, deltaLinha] of movimentosRelativos) {
        const novaColunaIndex = colunas.indexOf(colunaOrigem) + deltaColuna;
        const novaLinhaIndex = linhas.indexOf(linhaOrigem) + deltaLinha;

        if (novaColunaIndex >= 0 && novaColunaIndex < colunas.length &&
            novaLinhaIndex >= 0 && novaLinhaIndex < linhas.length) {
            const novaColuna = colunas[novaColunaIndex];
            const novaLinha = linhas[novaLinhaIndex];
            const idNovaPosicao = `${novaColuna}${novaLinha}`;
            const novaPosicao = document.getElementById(idNovaPosicao);

            movimentosPossivelCavalo.push(idNovaPosicao);

            if (novaPosicao) {
                const pecaCaminho = novaPosicao.querySelector('.peca');

                if (!pecaCaminho) {
                    novaPosicao.classList.add('movimento');

                } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
                    novaPosicao.classList.add('captura');
                    novaPosicao.classList.add('movimento');
                }
            }
        }
    }
}


function movimentoTorre(posicao) {
    const [colunaOrigem, linhaOrigem] = posicao.id;

    const movimentosPossiveisTorre = [];

    // Movimentos relativos da torre (horizontal e vertical)
    const movimentosRelativos = [
        [0, 1],   // Movimento para cima
        [0, -1],  // Movimento para baixo
        [1, 0],   // Movimento para direita
        [-1, 0]   // Movimento para esquerda
    ];

    for (const [deltaColuna, deltaLinha] of movimentosRelativos) {
        let novaColunaIndex = colunas.indexOf(colunaOrigem);
        let novaLinhaIndex = linhas.indexOf(linhaOrigem);

        while (true) {
            novaColunaIndex += deltaColuna;
            novaLinhaIndex += deltaLinha;

            if (novaColunaIndex < 0 || novaColunaIndex >= colunas.length ||
                novaLinhaIndex < 0 || novaLinhaIndex >= linhas.length) {
                break; // Fora do tabuleiro, interrompe o loop
            }

            const novaColuna = colunas[novaColunaIndex];
            const novaLinha = linhas[novaLinhaIndex];
            const idNovaPosicao = `${novaColuna}${novaLinha}`;
            const novaPosicao = document.getElementById(idNovaPosicao);

            movimentosPossiveisTorre.push(idNovaPosicao);

            if (novaPosicao) {
                const pecaCaminho = novaPosicao.querySelector('.peca');

                if (!pecaCaminho) {
                    novaPosicao.classList.add('movimento');
                } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
                    novaPosicao.classList.add('captura');
                    novaPosicao.classList.add('movimento');
                    break;
                } else {
                    break;
                }
            }
        }
    }
}


function movimentoBispo(posicao) {
    const [colunaOrigem, linhaOrigem] = posicao.id;

    const movimentosPossiveisBispo = [];

    const movimentosRelativos = [
        [1, 1],    // Diagonal superior direita
        [1, -1],   // Diagonal inferior direita
        [-1, 1],   // Diagonal superior esquerda
        [-1, -1]   // Diagonal inferior esquerda
    ];

    for (const [deltaColuna, deltaLinha] of movimentosRelativos) {
        let novaColunaIndex = colunas.indexOf(colunaOrigem);
        let novaLinhaIndex = linhas.indexOf(linhaOrigem);

        while (true) {
            novaColunaIndex += deltaColuna;
            novaLinhaIndex += deltaLinha;

            if (novaColunaIndex < 0 || novaColunaIndex >= colunas.length ||
                novaLinhaIndex < 0 || novaLinhaIndex >= linhas.length) {
                break; // Fora do tabuleiro, interrompe o loop
            }

            const novaColuna = colunas[novaColunaIndex];
            const novaLinha = linhas[novaLinhaIndex];
            const idNovaPosicao = `${novaColuna}${novaLinha}`;
            const novaPosicao = document.getElementById(idNovaPosicao);

            movimentosPossiveisBispo.push(idNovaPosicao);

            if (novaPosicao) {
                const pecaCaminho = novaPosicao.querySelector('.peca');

                if (!pecaCaminho) {
                    novaPosicao.classList.add('movimento');
                } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
                    novaPosicao.classList.add('captura');
                    novaPosicao.classList.add('movimento');
                    break;
                } else {
                    break;
                }
            }
        }
    }
}


function movimentoRainha(posicao) {
    movimentoBispo(posicao);
    movimentoTorre(posicao);
}

function movimentoRei(posicao) {
    const [colunaOrigem, linhaOrigem] = posicao.id;

    const movimentosPossiveisRei = [];

    const movimentosRelativos = [
        [0, 1],   // Movimento para cima
        [0, -1],  // Movimento para baixo
        [1, 0],   // Movimento para direita
        [-1, 0],  // Movimento para esquerda
        [1, 1],   // Diagonal superior direita
        [1, -1],  // Diagonal inferior direita
        [-1, 1],  // Diagonal superior esquerda
        [-1, -1]  // Diagonal inferior esquerda
    ];

    for (const [deltaColuna, deltaLinha] of movimentosRelativos) {
        const novaColunaIndex = colunas.indexOf(colunaOrigem) + deltaColuna;
        const novaLinhaIndex = linhas.indexOf(linhaOrigem) + deltaLinha;

        if (novaColunaIndex >= 0 && novaColunaIndex < colunas.length &&
            novaLinhaIndex >= 0 && novaLinhaIndex < linhas.length) {
            const novaColuna = colunas[novaColunaIndex];
            const novaLinha = linhas[novaLinhaIndex];
            const idNovaPosicao = `${novaColuna}${novaLinha}`;
            const novaPosicao = document.getElementById(idNovaPosicao);

            movimentosPossiveisRei.push(idNovaPosicao);

            if (novaPosicao) {
                const pecaCaminho = novaPosicao.querySelector('.peca');

                if (!pecaCaminho) {
                    novaPosicao.classList.add('movimento');
                } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
                    novaPosicao.classList.add('captura');
                    novaPosicao.classList.add('movimento');
                }
            }
        }
    }
}


function movimentoPeao(posicao) {
    const [colunaOrigem, linhaOrigem] = posicao.id;

    const movimentosPossiveisPeao = [];

    const direcao = (jogadorAtual === 'timeA') ? 1 : -1; // Define a direção dos peões

    const movimentoSimples = [0, direcao];
    const movimentoDuplo = [0, direcao * 2];
    const capturaDireita = [1, direcao];
    const capturaEsquerda = [-1, direcao];

    const posicaoFrente = `${colunaOrigem}${linhas[linhas.indexOf(linhaOrigem) + direcao]}`;
    const posicaoFrenteDuplo = `${colunaOrigem}${linhas[linhas.indexOf(linhaOrigem) + direcao * 2]}`;

    const elementoFrente = document.getElementById(posicaoFrente);
    const elementoFrenteDuplo = document.getElementById(posicaoFrenteDuplo);

    if (elementoFrente && !elementoFrente.querySelector('.peca')) {
        movimentosPossiveisPeao.push(posicaoFrente);
        elementoFrente.classList.add('movimento');
    }

    if ((jogadorAtual === 'timeA' && linhaOrigem === '2') ||
        (jogadorAtual === 'timeB' && linhaOrigem === '7')) {
        if (elementoFrenteDuplo && !elementoFrenteDuplo.querySelector('.peca') &&
            !elementoFrente.querySelector('.peca')) {
            movimentosPossiveisPeao.push(posicaoFrenteDuplo);
            elementoFrenteDuplo.classList.add('movimento');
        }
    }

    const verificaCaptura = (deltaColuna, deltaLinha) => {
        const novaColunaIndex = colunas.indexOf(colunaOrigem) + deltaColuna;
        const novaLinhaIndex = linhas.indexOf(linhaOrigem) + deltaLinha;

        if (novaColunaIndex >= 0 && novaColunaIndex < colunas.length &&
            novaLinhaIndex >= 0 && novaLinhaIndex < linhas.length) {
            const novaColuna = colunas[novaColunaIndex];
            const novaLinha = linhas[novaLinhaIndex];
            const idNovaPosicao = `${novaColuna}${novaLinha}`;
            const novaPosicao = document.getElementById(idNovaPosicao);

            if (novaPosicao) {
                const pecaCaminho = novaPosicao.querySelector('.peca');

                if (pecaCaminho && !pecaCaminho.classList.contains(jogadorAtual)) {
                    novaPosicao.classList.add('captura');
                    novaPosicao.classList.add('movimento');
                    movimentosPossiveisPeao.push(idNovaPosicao);
                }
            }
        }
    };

    verificaCaptura(1, direcao);
    verificaCaptura(-1, direcao);
}

var posicaoParaPromocao;

function movimentarPeca(posicaoDestino) {
    const [colunaDestino, linhaDestino] = posicaoDestino.id;
    const posicaoOrigem = document.querySelector('.posicao.destacar');
    const pecaOrigem = posicaoOrigem.querySelector('.peca');
    const posicaoOcupada = posicaoDestino.classList.contains('.peca');
    const posicionamentoDaPeca =  posicaoDestino.querySelector('div')

    if (pecaOrigem.classList.contains('peao') && (jogadorAtual === 'timeA' && linhaDestino === '8') ||
        (jogadorAtual === 'timeB' && linhaDestino === '1')) {
        posicaoParaPromocao = posicionamentoDaPeca;
        pecaOrigem.className = '';
        openPopup();
    } else if (!posicaoOcupada && posicaoDestino.classList.contains('movimento')) {
        posicaoDestino = posicaoDestino.querySelector('div')
        posicaoDestino.setAttribute('class', pecaOrigem.getAttribute('class'));
        pecaOrigem.removeAttribute('class');
        passarVez();
    } else if (posicaoOcupada && !pecaOrigem.classList.contains('jogadorAtual')) {
        posicaoDestino = posicaoDestino.querySelector('div')
        posicaoDestino.setAttribute('class', pecaOrigem.getAttribute('class'));
        pecaOrigem.removeAttribute('class');
        passarVez();
    }
    limparTabuleiro();
}

function passarVez() {
    jogadorAtual = jogadorAtual === 'timeA' ? 'timeB' : 'timeA';
}

// Promoção peão
function openPopup() {
    document.getElementById('popup').style.display = 'flex';
}

function cavalo() {
    if (jogadorAtual == 'timeA') {
        posicaoParaPromocao.classList.add('peca', 'cavalo', 'cavaloTimeA', 'timeA');
    } else {
        posicaoParaPromocao.classList.add('peca', 'cavalo', 'cavaloTimeB', 'timeB');
    }
    passarVez();
    closePopup();
}

function torre() {
    if (jogadorAtual == 'timeA') {
        posicaoParaPromocao.classList.add('peca', 'torre', 'torreTimeA', 'timeA');
    } else {
        posicaoParaPromocao.classList.add('peca', 'torre', 'torreTimeB', 'timeB');
    }
    passarVez();
    closePopup();
}

function bispo() {
    if (jogadorAtual == 'timeA') {
        posicaoParaPromocao.classList.add('peca', 'bispo', 'bispoTimeA', 'timeA');
    } else {
        posicaoParaPromocao.classList.add('peca', 'bispo', 'bispoTimeB', 'timeB');
    }
    passarVez();
    closePopup();
}

function rainha() {
    if (jogadorAtual == 'timeA') {
        posicaoParaPromocao.classList.add('peca', 'rainha', 'rainhaTimeA', 'timeA');
    } else {
        posicaoParaPromocao.classList.add('peca', 'rainha', 'rainhaTimeB', 'timeB');
    }
    passarVez();
    closePopup();
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

