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

for (let i = 0; i < posicaotabuleiro.length; i++) {
    const posicao = posicaotabuleiro[i];

    posicao.addEventListener('click', function () {
        for (let j = 0; j < posicaotabuleiro.length; j++) {
            posicaotabuleiro[j].classList.remove('destacar');
        }
        posicao.classList.add('destacar');

        const peca = posicao.querySelector('svg');
        if (!pecaSelecionada) {
            reconhecerPecaClicada(peca, posicao);
            pecaSelecionada = true;
        }

        if (peca == null) {
            pecaSelecionada = false;
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



function movimentosTorre(posicaoOrigem, colunaOrigem, linhaOrigem) {
    const movimentos = [];

    //movimentos para o lado esquerdo
    for (let i = colunas.indexOf(colunaOrigem) - 1; i >= 0; i--) {
        const novaColuna = colunas[i];
        const novaPosicao = `${novaColuna}${linhaOrigem}`;
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

    //movimentos para o lado direito
    for (let i = colunas.indexOf(colunaOrigem) + 1; i < colunas.length; i++) {
        const novaColuna = colunas[i];
        const novaPosicao = `${novaColuna}${linhaOrigem}`;
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

    //movimentos para baixo
    for (let i = linhas.indexOf(linhaOrigem) - 1; i >= 0; i--) {
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

    //movimentos para cima
    for (let i = linhas.indexOf(linhaOrigem) + 1; i < linhas.length; i++) {
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
    validarMovimento(posicaoOrigem);
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
            movimentos.push(novaPosicao);

            const elemento = document.getElementById(novaPosicao);
            if (elemento) {
                elemento.classList.add('movimento');
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

            if (!elemento || !elemento.querySelector('svg')) {
                movimentos.push(novaPosicao);

                const elemento = document.getElementById(novaPosicao);
                if (elemento) {
                    elemento.classList.add('movimento');
                }
            } else {
                break;
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

            if (!elemento || !elemento.querySelector('svg')) {
                movimentos.push(novaPosicao);

                const elemento = document.getElementById(novaPosicao);
                if (elemento) {
                    elemento.classList.add('movimento');
                }
            } else {
                break;
            }
        } else {
            break;
        }
    }

    // Movimentos na diagonal inferior esquerda
    for (let i = 1; i < 8; i++) {
        const novaColunaIndex = colunas.indexOf(colunaOrigem) - i;
        const novaLinhaIndex = linhas.indexOf(linhaOrigem) + i;

        if (novaColunaIndex >= 0 && novaLinhaIndex < linhas.length) {
            const novaColuna = colunas[novaColunaIndex];
            const novaLinha = linhas[novaLinhaIndex];
            const novaPosicao = `${novaColuna}${novaLinha}`;
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

            if (!elemento || !elemento.querySelector('svg')) {
                movimentos.push(novaPosicao);

                const elemento = document.getElementById(novaPosicao);
                if (elemento) {
                    elemento.classList.add('movimento');
                }
            } else {
                break;
            }
        } else {
            break;
        }
    }

    validarMovimento(posicaoOrigem);
}

function movimentosRainha(posicaoOrigem, colunaOrigem, linhaOrigem) {
    const movimentos = [];

    const deslocamentos = [-1, 0, 1];

    for (const dx of deslocamentos) {
        for (const dy of deslocamentos) {
            if (dx !== 0 || dy !== 0) {
                for (let i = 1; i < 8; i++) {
                    const novaColunaIndex = colunas.indexOf(colunaOrigem) + dx * i;
                    const novaLinhaIndex = linhas.indexOf(linhaOrigem) + dy * i;

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

                        if (!elemento || !elemento.querySelector('svg')) {
                            movimentos.push(novaPosicao);

                            const elemento = document.getElementById(novaPosicao);
                            if (elemento) {
                                elemento.classList.add('movimento');
                            }
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                }
            }
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

                    if (!elemento || !elemento.querySelector('svg')) {
                        movimentos.push(novaPosicao);

                        const elemento = document.getElementById(novaPosicao);
                        if (elemento) {
                            elemento.classList.add('movimento');
                        }
                    }
                }
            }
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
    validarMovimento(posicaoOrigem);
}

function movimentosPeaoTimeB(posicaoOrigem, colunaOrigem, linhaOrigem) {
    const movimentos = [];

    if (linhaOrigem == 7) {
        for (let i = linhas.indexOf(linhaOrigem) - 1 ; i >= 4; i--) {
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
    validarMovimento(posicaoOrigem);
}


function validarMovimento(posicaoOrigem) {
    let movimentoRealizado = false;

    for (let i = 0; i < posicaotabuleiro.length; i++) {
        const posicao = posicaotabuleiro[i];

        posicao.addEventListener('click', function () {
            if (!movimentoRealizado) {
                pecaSelecionada = false;
                var destino = posicaotabuleiro[i];
                var destinoOcupado = destino.querySelector('svg');

                //movimentar para o mesmo lugar || posição ocupada || movimento inválido
                if (destino == posicaoOrigem || destinoOcupado != null || !destino.classList.contains('movimento')) {
                    limparTabuleiro();
                    console.log('Movimento inválido');
                    movimentoRealizado = true;

                } else {
                    moverPeca(posicaoOrigem, destino);
                    limparTabuleiro();
                    movimentoRealizado = true;
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
    }
}





function moverPeca(origem, destino) {
    const peca = origem.querySelector('svg');
    destino.appendChild(peca);
}