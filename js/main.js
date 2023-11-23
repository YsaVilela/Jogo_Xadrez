const pecas = ['torre', 'cavalo', 'bispo', 'rainha', 'rei', 'peaoTimeA', 'peaoTimeB'];
const colunas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const linhas = ['1', '2', '3', '4', '5', '6', '7', '8'];
const times = ['timeA', 'timeB'];

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
let pecaSelecionada = false;
let roqueTimeADireito = true;
let roqueTimeAEsquerdo = true;
let roqueTimeBDireito = true;
let roqueValidoADireito = false;
let roqueValidoAEsquerdo = false;
let roqueValidoB = false;

let jogadorAtual = 'timeA'; // Comece com o jogador 'time A'

for (let i = 0; i < posicaotabuleiro.length; i++) {
    const posicao = posicaotabuleiro[i];

    posicao.addEventListener('click', function () {
        const peca = posicao.querySelector('.peca');

        if (peca && peca.classList.contains(jogadorAtual)) {
            for (let j = 0; j < posicaotabuleiro.length; j++) {
                posicaotabuleiro[j].classList.remove('destacar');
            }
            posicao.classList.add('destacar');

            if (!pecaSelecionada) {
                reconhecerPecaClicada(peca, posicao);
                pecaSelecionada = true;
            }
        }
    });
}


function reconhecerPecaClicada(peca, posicao) {
    let idPosicao = posicao.id;
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
        }
    }
}


function movimentosCavalo(posicaoOrigem, colunaOrigem, linhaOrigem) {
    const movimentos = [];

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
            const novaPosicao = `${novaColuna}${novaLinha}`;
            const elemento = document.getElementById(novaPosicao);

            movimentos.push(novaPosicao);

            if (elemento) {
                const pecaCaminho = elemento.querySelector('svg');

                if (!pecaCaminho) {
                    elemento.classList.add('movimento');

                } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
                    elemento.classList.add('captura');
                    elemento.classList.add('movimento');
                }
            }
        }
    }

    validarMovimento(posicaoOrigem);
}


function movimentosTorre(posicaoOrigem, colunaOrigem, linhaOrigem) {
    const movimentos = [];

    //movimentos para o lado esquerdo
    for (let i = colunas.indexOf(colunaOrigem) - 1; i >= 0; i--) {
        const novaColuna = colunas[i];
        const novaPosicao = `${novaColuna}${linhaOrigem}`;
        const elemento = document.getElementById(novaPosicao);
        const pecaCaminho = elemento.querySelector('svg');

        if (!pecaCaminho) {
            elemento.classList.add('movimento');

        } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
            elemento.classList.add('captura');
            elemento.classList.add('movimento');
            break;
        } else if (pecaCaminho.classList.contains(jogadorAtual)) {
            break;
        }
    }

    //movimentos para o lado direito
    for (let i = colunas.indexOf(colunaOrigem) + 1; i < colunas.length; i++) {
        const novaColuna = colunas[i];
        const novaPosicao = `${novaColuna}${linhaOrigem}`;
        const elemento = document.getElementById(novaPosicao);
        const pecaCaminho = elemento.querySelector('svg');

        if (!pecaCaminho) {
            elemento.classList.add('movimento');

        } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
            elemento.classList.add('captura');
            elemento.classList.add('movimento');
            break;
        } else if (pecaCaminho.classList.contains(jogadorAtual)) {
            break;
        }
    }

    //movimentos para baixo
    for (let i = linhas.indexOf(linhaOrigem) - 1; i >= 0; i--) {
        const novaLinha = linhas[i];
        const novaPosicao = `${colunaOrigem}${novaLinha}`;
        const elemento = document.getElementById(novaPosicao);
        const pecaCaminho = elemento.querySelector('svg');

        if (!pecaCaminho) {
            elemento.classList.add('movimento');

        } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
            elemento.classList.add('captura');
            elemento.classList.add('movimento');
            break;
        } else if (pecaCaminho.classList.contains(jogadorAtual)) {
            break;
        }
    }

    //movimentos para cima
    for (let i = linhas.indexOf(linhaOrigem) + 1; i < linhas.length; i++) {
        const novaLinha = linhas[i];
        const novaPosicao = `${colunaOrigem}${novaLinha}`;
        const elemento = document.getElementById(novaPosicao);

        if (elemento) {
            const pecaCaminho = elemento.querySelector('svg');

            if (!pecaCaminho) {
                elemento.classList.add('movimento');

            } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
                elemento.classList.add('captura');
                elemento.classList.add('movimento');
                break;
            } else if (pecaCaminho.classList.contains(jogadorAtual)) {
                break;
            }
        }
    }
    validarMovimento(posicaoOrigem);
}

function movimentosBispo(posicaoOrigem, colunaOrigem, linhaOrigem) {
    const movimentos = [];

    // Movimentos na diagonal superior esquerda
    for (let i = 1; i < 8; i++) {
        const novaColunaIndex = colunas.indexOf(colunaOrigem) - i;
        const novaLinhaIndex = linhas.indexOf(linhaOrigem) - i;

        if (novaColunaIndex >= 0 && novaLinhaIndex >= 0) {
            const novaColuna = colunas[novaColunaIndex];
            const novaLinha = linhas[novaLinhaIndex];
            const novaPosicao = `${novaColuna}${novaLinha}`;
            const elemento = document.getElementById(novaPosicao);

            movimentos.push(novaPosicao);

            if (elemento) {
                const pecaCaminho = elemento.querySelector('svg');

                if (!pecaCaminho) {
                    elemento.classList.add('movimento');

                } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
                    elemento.classList.add('captura');
                    elemento.classList.add('movimento');
                    break;
                } else if (pecaCaminho.classList.contains(jogadorAtual)) {
                    break;
                }
            }
        }
    }


    // Movimentos na diagonal inferior direita
    for (let i = 1; i < 8; i++) {
        const novaColunaIndex = colunas.indexOf(colunaOrigem) + i;
        const novaLinhaIndex = linhas.indexOf(linhaOrigem) - i;

        if (novaColunaIndex >= 0 && novaLinhaIndex >= 0) {
            const novaColuna = colunas[novaColunaIndex];
            const novaLinha = linhas[novaLinhaIndex];
            const novaPosicao = `${novaColuna}${novaLinha}`;
            const elemento = document.getElementById(novaPosicao);

            movimentos.push(novaPosicao);

            if (elemento) {
                const pecaCaminho = elemento.querySelector('svg');

                if (!pecaCaminho) {
                    elemento.classList.add('movimento');

                } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
                    elemento.classList.add('captura');
                    elemento.classList.add('movimento');
                    break;
                } else if (pecaCaminho.classList.contains(jogadorAtual)) {
                    break;
                }
            }
        }
    }

    // Movimentos na diagonal superior esquerda
    for (let i = 1; i < 8; i++) {
        const novaColunaIndex = colunas.indexOf(colunaOrigem) - i;
        const novaLinhaIndex = linhas.indexOf(linhaOrigem) + i;

        if (novaColunaIndex >= 0 && novaLinhaIndex >= 0) {
            const novaColuna = colunas[novaColunaIndex];
            const novaLinha = linhas[novaLinhaIndex];
            const novaPosicao = `${novaColuna}${novaLinha}`;
            const elemento = document.getElementById(novaPosicao);

            movimentos.push(novaPosicao);

            if (elemento) {
                const pecaCaminho = elemento.querySelector('svg');

                if (!pecaCaminho) {
                    elemento.classList.add('movimento');

                } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
                    elemento.classList.add('captura');
                    elemento.classList.add('movimento');
                    break;
                } else if (pecaCaminho.classList.contains(jogadorAtual)) {
                    break;
                }
            }
        }
    }


    // Movimentos na diagonal superior direita
    for (let i = 1; i < 8; i++) {
        const novaColunaIndex = colunas.indexOf(colunaOrigem) + i;
        const novaLinhaIndex = linhas.indexOf(linhaOrigem) + i;

        if (novaColunaIndex >= 0 && novaLinhaIndex >= 0) {
            const novaColuna = colunas[novaColunaIndex];
            const novaLinha = linhas[novaLinhaIndex];
            const novaPosicao = `${novaColuna}${novaLinha}`;
            const elemento = document.getElementById(novaPosicao);

            movimentos.push(novaPosicao);

            if (elemento) {
                const pecaCaminho = elemento.querySelector('svg');

                if (!pecaCaminho) {
                    elemento.classList.add('movimento');

                } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
                    elemento.classList.add('captura');
                    elemento.classList.add('movimento');
                    break;
                } else if (pecaCaminho.classList.contains(jogadorAtual)) {
                    break;
                }
            }
        }
    }

    validarMovimento(posicaoOrigem);
}

function movimentosRainha(posicaoOrigem, colunaOrigem, linhaOrigem) {
    const movimentos = [];

    //movimentos para o lado esquerdo
    for (let i = colunas.indexOf(colunaOrigem) - 1; i >= 0; i--) {
        const novaColuna = colunas[i];
        const novaPosicao = `${novaColuna}${linhaOrigem}`;
        const elemento = document.getElementById(novaPosicao);
        const pecaCaminho = elemento.querySelector('svg');

        if (!pecaCaminho) {
            elemento.classList.add('movimento');

        } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
            elemento.classList.add('captura');
            elemento.classList.add('movimento');
            break;
        } else if (pecaCaminho.classList.contains(jogadorAtual)) {
            break;
        }
    }


    //movimentos para o lado direito
    for (let i = colunas.indexOf(colunaOrigem) + 1; i < colunas.length; i++) {
        const novaColuna = colunas[i];
        const novaPosicao = `${novaColuna}${linhaOrigem}`;
        const elemento = document.getElementById(novaPosicao);
        const pecaCaminho = elemento.querySelector('svg');

        if (!pecaCaminho) {
            elemento.classList.add('movimento');

        } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
            elemento.classList.add('captura');
            elemento.classList.add('movimento');
            break;
        } else if (pecaCaminho.classList.contains(jogadorAtual)) {
            break;
        }
    }

    //movimentos para baixo
    for (let i = linhas.indexOf(linhaOrigem) - 1; i >= 0; i--) {
        const novaLinha = linhas[i];
        const novaPosicao = `${colunaOrigem}${novaLinha}`;
        const elemento = document.getElementById(novaPosicao);
        const pecaCaminho = elemento.querySelector('svg');

        if (!pecaCaminho) {
            elemento.classList.add('movimento');

        } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
            elemento.classList.add('captura');
            elemento.classList.add('movimento');
            break;
        } else if (pecaCaminho.classList.contains(jogadorAtual)) {
            break;
        }
    }

    //movimentos para cima
    for (let i = linhas.indexOf(linhaOrigem) + 1; i < linhas.length; i++) {
        const novaLinha = linhas[i];
        const novaPosicao = `${colunaOrigem}${novaLinha}`;
        const elemento = document.getElementById(novaPosicao);
        const pecaCaminho = elemento.querySelector('svg');

        if (!pecaCaminho) {
            elemento.classList.add('movimento');

        } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
            elemento.classList.add('captura');
            elemento.classList.add('movimento');
            break;
        } else if (pecaCaminho.classList.contains(jogadorAtual)) {
            break;
        }
    }

    // Movimentos na diagonal superior esquerda
    for (let i = 1; i < 8; i++) {
        const novaColunaIndex = colunas.indexOf(colunaOrigem) - i;
        const novaLinhaIndex = linhas.indexOf(linhaOrigem) - i;

        if (novaColunaIndex >= 0 && novaLinhaIndex >= 0) {
            const novaColuna = colunas[novaColunaIndex];
            const novaLinha = linhas[novaLinhaIndex];
            const novaPosicao = `${novaColuna}${novaLinha}`;
            const elemento = document.getElementById(novaPosicao);

            if (elemento) {
                const pecaCaminho = elemento.querySelector('svg');

                if (!pecaCaminho) {
                    elemento.classList.add('movimento');

                } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
                    elemento.classList.add('captura');
                    elemento.classList.add('movimento');
                    break;
                } else if (pecaCaminho.classList.contains(jogadorAtual)) {
                    break;
                }
            }
        } else {
            break;
        }
    }

    // Movimentos na diagonal superior direita
    for (let i = 1; i < 8; i++) {
        const novaColunaIndex = colunas.indexOf(colunaOrigem) + i;
        const novaLinhaIndex = linhas.indexOf(linhaOrigem) - i;

        if (novaColunaIndex < colunas.length && novaLinhaIndex >= 0) {
            const novaColuna = colunas[novaColunaIndex];
            const novaLinha = linhas[novaLinhaIndex];
            const novaPosicao = `${novaColuna}${novaLinha}`;
            const elemento = document.getElementById(novaPosicao);

            if (elemento) {
                const pecaCaminho = elemento.querySelector('svg');

                if (!pecaCaminho) {
                    elemento.classList.add('movimento');

                } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
                    elemento.classList.add('captura');
                    elemento.classList.add('movimento');
                    break;
                } else if (pecaCaminho.classList.contains(jogadorAtual)) {
                    break;
                }
            }
        } else {
            break;
        }
    }

    // Movimentos na diagonal inferior esquerda
    for (let i = 1; i < 8; i++) {
        const novaColunaIndex = colunas.indexOf(colunaOrigem) - i;
        const novaLinhaIndex = linhas.indexOf(linhaOrigem) + i;

        if (novaColunaIndex < colunas.length && novaLinhaIndex >= 0) {
            const novaColuna = colunas[novaColunaIndex];
            const novaLinha = linhas[novaLinhaIndex];
            const novaPosicao = `${novaColuna}${novaLinha}`;
            const elemento = document.getElementById(novaPosicao);

            if (elemento) {
                const pecaCaminho = elemento.querySelector('svg');

                if (!pecaCaminho) {
                    elemento.classList.add('movimento');

                } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
                    elemento.classList.add('captura');
                    elemento.classList.add('movimento');
                    break;
                } else if (pecaCaminho.classList.contains(jogadorAtual)) {
                    break;
                }
            }
        } else {
            break;
        }
    }

    // Movimentos na diagonal inferior direita
    for (let i = 1; i < 8; i++) {
        const novaColunaIndex = colunas.indexOf(colunaOrigem) + i;
        const novaLinhaIndex = linhas.indexOf(linhaOrigem) + i;

        if (novaColunaIndex < colunas.length && novaLinhaIndex < linhas.length) {
            const novaColuna = colunas[novaColunaIndex];
            const novaLinha = linhas[novaLinhaIndex];
            const novaPosicao = `${novaColuna}${novaLinha}`;
            const elemento = document.getElementById(novaPosicao);

            if (elemento) {
                const pecaCaminho = elemento.querySelector('svg');

                if (!pecaCaminho) {
                    elemento.classList.add('movimento');

                } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
                    elemento.classList.add('captura');
                    elemento.classList.add('movimento');
                    break;
                } else if (pecaCaminho.classList.contains(jogadorAtual)) {
                    break;
                }
            }
        } else {
            break;
        }
    }
    validarMovimento(posicaoOrigem);
}


function movimentosRei(posicaoOrigem, colunaOrigem, linhaOrigem) {
    const movimentos = [];

    const deslocamentos = [-1, 0, 1];

    for (const dx of deslocamentos) {
        for (const dy of deslocamentos) {
            if (dx !== 0 || dy !== 0) {
                const novaColunaIndex = colunas.indexOf(colunaOrigem) + dx;
                const novaLinhaIndex = linhas.indexOf(linhaOrigem) + dy;

                if (
                    novaColunaIndex >= 0 &&
                    novaColunaIndex < colunas.length &&
                    novaLinhaIndex >= 0 &&
                    novaLinhaIndex < linhas.length
                ) {
                    const novaColuna = colunas[novaColunaIndex];
                    const novaLinha = linhas[novaLinhaIndex];
                    const novaPosicao = `${novaColuna}${novaLinha}`;
                    const elemento = document.getElementById(novaPosicao);

                    if (elemento) {
                        const pecaCaminho = elemento.querySelector('svg');

                        if (!pecaCaminho) {
                            elemento.classList.add('movimento');

                        } else if (!pecaCaminho.classList.contains(jogadorAtual)) {
                            elemento.classList.add('captura');
                            elemento.classList.add('movimento');
                        }
                    }
                }
            }
        }
    }

    var pecaOrigem = posicaoOrigem.querySelector('svg');
    console.log(!posicaotabuleiro[47].querySelector('svg') + ' F1');
    console.log(!posicaotabuleiro[55].querySelector('svg') + ' G1');

    if (pecaOrigem.classList.contains('timeA') && roqueTimeADireito) {
        //posição 47 = F1 && posição 55 = G1
        if (!posicaotabuleiro[47].querySelector('svg') && !posicaotabuleiro[55].querySelector('svg')) {
            const elemento = document.getElementById('G1');
            elemento.classList.add('movimento');
            roqueValidoADireito = true;
        }
    }
    if (pecaOrigem.classList.contains('timeA') && roqueTimeAEsquerdo) {
        //posição  15 = B1 && posição 23 = C1 && posição 31 = D1
        if (!posicaotabuleiro[15].querySelector('svg') && !posicaotabuleiro[23].querySelector('svg') && !posicaotabuleiro[31].querySelector('svg')) {
            const elemento = document.getElementById('C1');
            elemento.classList.add('movimento');
            roqueValidoAEsquerdo = true;
        }
    }

    if (pecaOrigem.classList.contains('timeB') && roqueTimeBDireito) {
        //posição 40 = F8 && posição 48 = G8
        if (!posicaotabuleiro[40].querySelector('svg') && !posicaotabuleiro[48].querySelector('svg')) {
            const elemento = document.getElementById('G8');
            elemento.classList.add('movimento');
            roqueValidoB = true;
        }
    }

    validarMovimento(posicaoOrigem)
}

function movimentosPeaoTimeA(posicaoOrigem, colunaOrigem, linhaOrigem) {
    const movimentos = [];

    if (linhaOrigem == 2) {
        for (let i = linhas.indexOf(linhaOrigem) + 1; i <= 3; i++) {
            const novaLinha = linhas[i];
            const novaPosicao = `${colunaOrigem}${novaLinha}`;
            const elemento = document.getElementById(novaPosicao);

            if (!elemento || !elemento.querySelector('svg')) {
                movimentos.push(novaPosicao);

                const elemento = document.getElementById(novaPosicao);
                if (elemento) {
                    elemento.classList.add('movimento');
                }
            } else {
                break;
            }
        }
    } else {
        let i = linhas.indexOf(linhaOrigem);
        const novaLinha = parseInt(linhas[i]) + 1;
        const novaPosicao = `${colunaOrigem}${novaLinha}`;
        const elemento = document.getElementById(novaPosicao);

        if (!elemento || !elemento.querySelector('svg')) {
            movimentos.push(novaPosicao);

            const elemento = document.getElementById(novaPosicao);
            if (elemento) {
                elemento.classList.add('movimento');
            }
        }
    }

    // Movimentos de captura à esquerda
    const colunaEsquerda = colunas.indexOf(colunaOrigem) - 1;
    if (colunaEsquerda >= 0) {
        const novaColunaEsquerda = colunas[colunaEsquerda];
        const novaLinhaEsquerda = parseInt(linhaOrigem) + 1;
        const novaPosicaoEsquerda = `${novaColunaEsquerda}${novaLinhaEsquerda}`;
        const elementoEsquerda = document.getElementById(novaPosicaoEsquerda);

        if (elementoEsquerda && elementoEsquerda.querySelector('svg')) {
            const pecaElementoEsqueda = elementoEsquerda.querySelector('svg')
            if (!pecaElementoEsqueda.classList.contains(jogadorAtual)) {
                movimentos.push(novaPosicaoEsquerda);
                elementoEsquerda.classList.add('movimento');
                elementoEsquerda.classList.add('captura');
            }
        }
    }

    // Movimentos de captura à direita
    const colunaDireita = colunas.indexOf(colunaOrigem) + 1;
    if (colunaDireita < colunas.length) {
        const novaColunaDireita = colunas[colunaDireita];
        const novaLinhaDireita = parseInt(linhaOrigem) + 1;
        const novaPosicaoDireita = `${novaColunaDireita}${novaLinhaDireita}`;
        const elementoDireita = document.getElementById(novaPosicaoDireita);

        if (elementoDireita && elementoDireita.querySelector('svg')) {
            const pecaElementoDireita = elementoDireita.querySelector('svg')
            if (!pecaElementoDireita.classList.contains(jogadorAtual)) {
                movimentos.push(novaPosicaoDireita);
                elementoDireita.classList.add('movimento');
                elementoDireita.classList.add('captura');
            }
        }
    }

    validarMovimento(posicaoOrigem);
}

function movimentosPeaoTimeB(posicaoOrigem, colunaOrigem, linhaOrigem) {
    const movimentos = [];

    if (linhaOrigem == 7) {
        for (let i = linhas.indexOf(linhaOrigem) - 1; i >= 4; i--) {
            const novaLinha = linhas[i];
            const novaPosicao = `${colunaOrigem}${novaLinha}`;
            const elemento = document.getElementById(novaPosicao);

            if (!elemento || !elemento.querySelector('svg')) {
                movimentos.push(novaPosicao);

                const elemento = document.getElementById(novaPosicao);
                if (elemento) {
                    elemento.classList.add('movimento');
                }
            } else {
                break;
            }
        }
    } else {
        let i = linhas.indexOf(linhaOrigem);
        const novaLinha = parseInt(linhas[i]) - 1;
        const novaPosicao = `${colunaOrigem}${novaLinha}`;
        const elemento = document.getElementById(novaPosicao);

        if (!elemento || !elemento.querySelector('svg')) {
            movimentos.push(novaPosicao);

            const elemento = document.getElementById(novaPosicao);
            if (elemento) {
                elemento.classList.add('movimento');
            }
        }
    }

    // Movimentos de captura à esquerda
    const colunaEsquerda = colunas.indexOf(colunaOrigem) - 1;
    if (colunaEsquerda >= 0) {
        const novaColunaEsquerda = colunas[colunaEsquerda];
        const novaLinhaEsquerda = parseInt(linhaOrigem) - 1;
        const novaPosicaoEsquerda = `${novaColunaEsquerda}${novaLinhaEsquerda}`;
        const elementoEsquerda = document.getElementById(novaPosicaoEsquerda);

        if (elementoEsquerda && elementoEsquerda.querySelector('svg')) {
            const pecaElementoEsqueda = elementoEsquerda.querySelector('svg')
            if (!pecaElementoEsqueda.classList.contains(jogadorAtual)) {
                movimentos.push(novaPosicaoEsquerda);
                elementoEsquerda.classList.add('movimento');
                elementoEsquerda.classList.add('captura');
            }
        }
    }

    // Movimentos de captura à direita
    const colunaDireita = colunas.indexOf(colunaOrigem) + 1;
    if (colunaDireita < colunas.length) {
        const novaColunaDireita = colunas[colunaDireita];
        const novaLinhaDireita = parseInt(linhaOrigem) - 1;
        const novaPosicaoDireita = `${novaColunaDireita}${novaLinhaDireita}`;
        const elementoDireita = document.getElementById(novaPosicaoDireita);

        if (elementoDireita && elementoDireita.querySelector('svg')) {
            const pecaElementoDireita = elementoDireita.querySelector('svg')
            if (!pecaElementoDireita.classList.contains(jogadorAtual)) {
                movimentos.push(novaPosicaoDireita);
                elementoDireita.classList.add('movimento');
                elementoDireita.classList.add('captura');
            }
        }
    }
    validarMovimento(posicaoOrigem);
}


function captura(posicaoOrigem, posicaoDestino) {
    const pecaCapturada = posicaoDestino.querySelector('svg');
    posicaoDestino.removeChild(pecaCapturada);
    const pecaPromovida = posicaoOrigem.querySelector('svg');
    posicaoDestino.appendChild(pecaPromovida);
    passarVez();

    let nomePecaCapturada = null;
    for (let i = 0; i < pecas.length; i++) {
        if (pecaCapturada.classList.contains(pecas[i])) {
            nomePecaCapturada = pecas[i];
        }
    }
    console.log(nomePecaCapturada + ' capturada');
}


function validarMovimento(posicaoOrigem) {
    let movimentoRealizado = false;

    for (let i = 0; i < posicaotabuleiro.length; i++) {
        const posicao = posicaotabuleiro[i];
        const idPosicaoOrigem = posicaoOrigem.id;

        var pecaOrigem = posicaoOrigem.querySelector('svg');

        posicao.addEventListener('click', function () {

            if (!movimentoRealizado) {
                pecaSelecionada = false;
                var destino = posicaotabuleiro[i];
                var pecaDestino = destino.querySelector('svg');
                movimentoRealizado = true;

                //captura
                if (pecaDestino != null && destino.classList.contains('captura')) {
                    limparTabuleiro();
                    captura(posicaoOrigem, destino);
                }

                //movimentar para o mesmo lugar || movimento inválido
                else if (destino == posicaoOrigem || !destino.classList.contains('movimento')) {
                    limparTabuleiro();
                    console.log('Movimento inválido');

                } else if (roqueValidoADireito || roqueValidoAEsquerdo) {
                    roqueA(posicaoOrigem, destino);

                } else if (roqueValidoB) {
                    const idDestino = destino.id;
                    if (idDestino == 'G8') {
                        const posicaoTorre = document.getElementById('H8');
                        const torre = posicaoTorre.querySelector('svg');
                        const rei = posicaoOrigem.querySelector('svg');
                        destino.appendChild(rei);
                        const destinoTorre = document.getElementById('F8');
                        destinoTorre.appendChild(torre);

                        passarVez();
                        limparTabuleiro();
                    }
                } else {
                    validarRoque(pecaOrigem, idPosicaoOrigem);
                    moverPeca(posicaoOrigem, destino);
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
    for (let j = 0; j < posicaotabuleiro.length; j++) {
        posicaotabuleiro[j].classList.remove('movimento');
        posicaotabuleiro[j].classList.remove('destacar');
        posicaotabuleiro[j].classList.remove('captura');
    }
}

function moverPeca(posicaoOrigem, destino) {
    passarVez()
    const peca = posicaoOrigem.querySelector('svg');
    destino.appendChild(peca);
}

function passarVez() {
    jogadorAtual = jogadorAtual === 'timeA' ? 'timeB' : 'timeA';
}

function validarRoque(pecaOrigem, idPosicaoOrigem) {
    if (pecaOrigem.classList.contains('rei') || pecaOrigem.classList.contains('torre')) {
        if (pecaOrigem.classList.contains('rei') && pecaOrigem.classList.contains('timeA')) {
            roqueTimeADireito = false;
            roqueTimeAEsquerdo = false;
        }
        if (idPosicaoOrigem == 'H1') {
            roqueTimeADireito = false;
        }
        if (idPosicaoOrigem == 'A1') {
            roqueTimeAEsquerdo = false;
        }


        if (pecaOrigem.classList.contains('rei') && pecaOrigem.classList.contains('timeB')) {
            roqueTimeBDireito = false;
        }

        if (idPosicaoOrigem == 'H8') {
            roqueTimeBDireito = false;
        }
    }
}


function roqueA(posicaoOrigem, destino) {
    const idDestino = destino.id;

    if (roqueValidoADireito && roqueValidoAEsquerdo) {
        if (idDestino == 'G1') {
            const posicaoTorre = document.getElementById('H1');
            const torre = posicaoTorre.querySelector('svg');
            const rei = posicaoOrigem.querySelector('svg');
            destino.appendChild(rei);
            const destinoTorre = document.getElementById('F1');
            destinoTorre.appendChild(torre);

            passarVez();
            limparTabuleiro();
        } else if (idDestino == 'C1') {
            const posicaoTorre = document.getElementById('A1');
            const torre = posicaoTorre.querySelector('svg');
            const rei = posicaoOrigem.querySelector('svg');
            destino.appendChild(rei);
            const destinoTorre = document.getElementById('D1');
            destinoTorre.appendChild(torre);

            passarVez();
            limparTabuleiro();
        } 
    } 

        if (roqueValidoADireito) {
            if (idDestino == 'G1') {
                const posicaoTorre = document.getElementById('H1');
                const torre = posicaoTorre.querySelector('svg');
                const rei = posicaoOrigem.querySelector('svg');
                destino.appendChild(rei);
                const destinoTorre = document.getElementById('F1');
                destinoTorre.appendChild(torre);

                passarVez();
                limparTabuleiro();
            }
        }

    if (roqueValidoAEsquerdo) {
        if (idDestino == 'C1') {
            const posicaoTorre = document.getElementById('A1');
            const torre = posicaoTorre.querySelector('svg');
            const rei = posicaoOrigem.querySelector('svg');
            destino.appendChild(rei);
            const destinoTorre = document.getElementById('D1');
            destinoTorre.appendChild(torre);

            passarVez();
            limparTabuleiro();
        }
    }
}