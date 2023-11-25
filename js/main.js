const colunas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const linhas = ['1', '2', '3', '4', '5', '6', '7', '8'];
const times = ['timeA', 'timeB'];


const tabuleiro = document.querySelector('.tabuleiro');

let jogadorAtual = 'timeA'; // Comece com o jogador 'time A'

let pecaEscolhida = false;

let validacaoXeque = false;

let declararXeque = false;

var movimentosPossiveisRei = [];

var posicaoDeDestino;


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
            posicaoDeDestino = posicao;
            movimentarPeca();
        } else {
            posicaoDeDestino = elementoClicado;
            movimentarPeca();
        }
        pecaEscolhida = false;
    }
};

function limparTabuleiro() {
    const posicaotabuleiro = document.querySelectorAll('.posicao');
    for (let j = 0; j < posicaotabuleiro.length; j++) {
        posicaotabuleiro[j].classList.remove('destacar');
        posicaotabuleiro[j].classList.remove('movimento');
        posicaotabuleiro[j].classList.remove('captura');
        posicaotabuleiro[j].classList.remove('xeque');
    }
}

function movimentoCavalo(posicao) {
    const [colunaOrigem, linhaOrigem] = posicao.id;

    const movimentosPossiveisCavalo = [];

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
            const pecaCaminho = novaPosicao.querySelector('.peca');

            movimentosPossiveisCavalo.push(idNovaPosicao);

            //valida se o sei não entrará em xeque
            if (validacaoXeque) {
                if (movimentosPossiveisRei.includes(idNovaPosicao)) {
                    adicionarPosicaoXeque(novaPosicao);
                }

                //valida se o rei foi colocado em xeque
            } else if (declararXeque && !validacaoXeque) {
                if (pecaCaminho) {
                    if (pecaCaminho.classList.contains(jogadorAtual) && pecaCaminho.classList.contains('rei')) {
                        alertaDeXeque();
                    }
                }
            } else {
                if (novaPosicao) {
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

                //valida se o sei não entrará em xeque
                if (validacaoXeque && !declararXeque) {
                    if (pecaCaminho) {
                        if (pecaCaminho.classList.contains('rei') && pecaCaminho.classList.contains(jogadorAtual)) {
                            movimentosPossiveisTorre.filter(remover => remover == idNovaPosicao);
                        } else {
                            movimentosPossiveisTorre.filter(remover => remover == idNovaPosicao);
                            break;
                        }
                    }
                    if (movimentosPossiveisRei.includes(idNovaPosicao)) {
                        adicionarPosicaoXeque(novaPosicao);
                    }


                    //valida se o rei foi colocado em xeque
                } else if (declararXeque && !validacaoXeque) {
                    if (pecaCaminho) {
                        if (pecaCaminho.classList.contains(jogadorAtual) && pecaCaminho.classList.contains('rei')) {
                            alertaDeXeque();
                            break;
                        } else {
                            movimentosPossiveisTorre.filter(remover => remover == idNovaPosicao);
                            break;
                        }
                    }

                    //calcula os movimentos e demarca
                } else {
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

                if (validacaoXeque && !declararXeque) {
                    if (pecaCaminho) {
                        if (pecaCaminho.classList.contains('rei') && pecaCaminho.classList.contains(jogadorAtual)) {
                            movimentosPossiveisBispo.filter(remover => remover == idNovaPosicao);
                        } else {
                            movimentosPossiveisBispo.filter(remover => remover == idNovaPosicao);
                            break;
                        }
                    }
                    if (movimentosPossiveisRei.includes(idNovaPosicao)) {
                        adicionarPosicaoXeque(novaPosicao);
                    }
                    //valida se o rei foi colocado em xeque
                } else if (declararXeque && !validacaoXeque) {
                    if (pecaCaminho) {
                        if (pecaCaminho.classList.contains(jogadorAtual) && pecaCaminho.classList.contains('rei')) {
                            alertaDeXeque();
                            break;
                        } else {
                            movimentosPossiveisBispo.filter(remover => remover == idNovaPosicao);
                            break;
                        }
                    }
                } else {
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
}


function movimentoRainha(posicao) {
    movimentoBispo(posicao);
    movimentoTorre(posicao);
}


function movimentoRei(posicao) {
    const [colunaOrigem, linhaOrigem] = posicao.id;

    if (validacaoXeque) {
        var movimentosReiClicado = movimentosPossiveisRei;
    }

    movimentosPossiveisRei = [];

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

                if (validacaoXeque) {
                    if (movimentosReiClicado.includes(idNovaPosicao)) {
                        adicionarPosicaoXeque(novaPosicao);
                    }
                } else {

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

    if (!validacaoXeque) {
        validarXeque();
    }
}


function movimentoPeao(posicao) {
    const [colunaOrigem, linhaOrigem] = posicao.id;

    const movimentosPossiveisPeao = [];

    var peao = posicao.querySelector('.peca');
    var jogadorPeca;

    if (peao.classList.contains('timeA')) {
        jogadorPeca = 'timeA';
    } else {
        jogadorPeca = 'timeB';
    }

    const direcao = (peao.classList.contains('timeA')) ? 1 : -1; // Define a direção dos peões

    const posicaoFrente = `${colunaOrigem}${linhas[linhas.indexOf(linhaOrigem) + direcao]}`;
    const posicaoFrenteDuplo = `${colunaOrigem}${linhas[linhas.indexOf(linhaOrigem) + direcao * 2]}`;

    const elementoFrente = document.getElementById(posicaoFrente);
    const elementoFrenteDuplo = document.getElementById(posicaoFrenteDuplo);

    if (!validacaoXeque && !declararXeque) {
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
            const pecaCaminho = novaPosicao.querySelector('.peca');

            if (novaPosicao) {
                //valida se o sei não entrará em xeque
                if (validacaoXeque && !declararXeque) {
                    if (movimentosPossiveisRei.includes(idNovaPosicao)) {
                        adicionarPosicaoXeque(novaPosicao);
                    }
                }

                //valida se o rei foi colocado em xeque
                else if (declararXeque && !validacaoXeque) {
                    if (pecaCaminho) {
                        if (pecaCaminho.classList.contains(jogadorAtual) && pecaCaminho.classList.contains('rei')) {
                            alertaDeXeque();
                        }
                    }
                } else {
                    if (pecaCaminho && !pecaCaminho.classList.contains(jogadorPeca)) {
                        movimentosPossiveisPeao.push(idNovaPosicao);
                        novaPosicao.classList.add('captura');
                        novaPosicao.classList.add('movimento');
                    }
                }
            }
        }
    };

    verificaCaptura(1, direcao);
    verificaCaptura(-1, direcao);
}

var posicaoParaPromocao;

function movimentarPeca() {
    const [colunaDestino, linhaDestino] = posicaoDeDestino.id;
    const posicaoOrigem = document.querySelector('.posicao.destacar');
    const pecaOrigem = posicaoOrigem.querySelector('.peca');
    const posicaoOcupada = posicaoDeDestino.classList.contains('.peca');
    const posicionamentoDaPeca = posicaoDeDestino.querySelector('div')

    //realizar promoção do peão
    if (pecaOrigem.classList.contains('peao') && posicaoDeDestino.classList.contains('movimento') && ((jogadorAtual === 'timeA' && linhaDestino === '8') ||
        (jogadorAtual === 'timeB' && linhaDestino === '1'))) {
        posicionamentoDaPeca.className = '';
        posicaoParaPromocao = posicionamentoDaPeca;
        pecaOrigem.className = '';
        openPopup();

        //realizar movimento comum
    } else if (!posicaoOcupada && posicaoDeDestino.classList.contains('movimento')) {
        var pecaDeDestino = posicaoDeDestino.querySelector('div')
        pecaDeDestino.setAttribute('class', pecaOrigem.getAttribute('class'));
        pecaOrigem.removeAttribute('class');
        passarVez();

        //realizar captura
    } else if (posicaoOcupada && posicaoDeDestino.classList.contains('captura')) {
        posicaoDeDestino = posicaoDeDestino.querySelector('div')
        posicaoDeDestino.setAttribute('class', pecaOrigem.getAttribute('class'));
        pecaOrigem.removeAttribute('class');
        passarVez();
    }

    limparTabuleiro();

    possivelDeclaracaoXeque();
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



function validarXeque() {
    validacaoXeque = true;
    const oponente = (jogadorAtual === 'timeA') ? 'timeB' : 'timeA';

    const cavaloOponente = tabuleiro.querySelectorAll(`.cavalo.${oponente}`);
    if (cavaloOponente) {
        const posicaoCavalo = cavaloOponente[0].parentNode;
        movimentoCavalo(posicaoCavalo);

        if (cavaloOponente[1]) {
            const posicaoCavalo = cavaloOponente[1].parentNode;
            movimentoCavalo(posicaoCavalo);
        }
    }

    const torreOponente = tabuleiro.querySelectorAll(`.torre.${oponente}`);
    if (torreOponente) {
        const posicaoTorre = torreOponente[0].parentNode;
        movimentoTorre(posicaoTorre);

        if (torreOponente[1]) {
            const posicaoTorre = torreOponente[1].parentNode;
            movimentoTorre(posicaoTorre);
        }
    }

    const bispoOponente = tabuleiro.querySelectorAll(`.bispo.${oponente}`);
    if (bispoOponente) {
        const posicaoBispo = bispoOponente[0].parentNode;
        movimentoBispo(posicaoBispo);

        if (bispoOponente[1]) {
            const posicaoBispo = bispoOponente[1].parentNode;
            movimentoBispo(posicaoBispo);
        }
    }

    const rainhaOponente = tabuleiro.querySelector(`.rainha.${oponente}`);
    if (rainhaOponente) {
        const posicaoRainha = rainhaOponente.parentNode;
        movimentoRainha(posicaoRainha);
    }

    const peaoOponente = tabuleiro.querySelectorAll(`.peao.${oponente}`);
    for (let i = 0; i < peaoOponente.length; i++) {
        const posicaoPeao = peaoOponente[i].parentNode;
        movimentoPeao(posicaoPeao);
    }

    const reiOponente = tabuleiro.querySelector(`.rei.${oponente}`);
    if (reiOponente) {
        const posicaoRei = reiOponente.parentNode;
        movimentoRei(posicaoRei);
    }

    validacaoXeque = false;
}


function adicionarPosicaoXeque(posicao) {
    posicao.classList.remove('movimento');
    posicao.classList.remove('captura');
    posicao.classList.add('xeque');
}


function possivelDeclaracaoXeque() {
    declararXeque = true;
    var pecaDeDestino = posicaoDeDestino.querySelector('div')

    switch (true) {
        case pecaDeDestino.classList.contains('cavalo'):
            movimentoCavalo(posicaoDeDestino);
            break;
        case pecaDeDestino.classList.contains('torre'):
            movimentoTorre(posicaoDeDestino);
            break;
        case pecaDeDestino.classList.contains('bispo'):
            movimentoBispo(posicaoDeDestino);
            break;
        case pecaDeDestino.classList.contains('rainha'):
            movimentoRainha(posicaoDeDestino);
            break;
        case pecaDeDestino.classList.contains('peao'):
            movimentoPeao(posicaoDeDestino);
            break;
        default:
            console.log('Peça não identificada');
    }

    declararXeque = false;
}

function alertaDeXeque() {
    const reiEmXeque = tabuleiro.querySelector(`.rei.${jogadorAtual}`);
    const posicao = reiEmXeque.parentNode;

    posicao.classList.add('reiEmXeque');
}