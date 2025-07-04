const fs = require('fs');
const readline = require('readline');

// Função que calcula a correlação de Pearson
function calcularCorrelacao(coluna, registros) {
    let n = 0;
    let somaX = 0, somaY = 0, somaXY = 0;
    let somaX2 = 0, somaY2 = 0;

    registros.forEach(user => {
        const x = parseFloat(user[coluna]);
        const y = parseFloat(user['PerformanceWritten Test']);

        if (isNaN(x) || isNaN(y)) return;

        n++;
        somaX += x;
        somaY += y;
        somaXY += x * y;
        somaX2 += x * x;
        somaY2 += y * y;
    });

    const numerador = (n * somaXY) - (somaX * somaY);
    const denominador = Math.sqrt(
        (n * somaX2 - somaX * somaX) * (n * somaY2 - somaY * somaY)
    );

    if (denominador === 0) return 0;

    return numerador / denominador;
}

// Classificação da correlação
function classificarCorrelacao(r) {
    const absR = Math.abs(r);
    if (absR < 0.1) return "NULA";
    if (absR < 0.35) return "FRACA";
    if (absR < 0.65) return "MÉDIA";
    if (absR < 0.95) return "FORTE";
    return "MUITO FORTE / PERFEITA";
}

// Função que calcula a correlação de todas as colunas e retorna as 10 maiores
function encontrarTop10Colunas(registros) {
    const exemplo = registros[0];
    const colunasNumericas = Object.keys(exemplo).filter(coluna =>
        coluna !== 'PerformanceWritten Test' // Não comparar consigo mesma
    );

    const correlacoes = colunasNumericas.map(coluna => {
        const r = calcularCorrelacao(coluna, registros);
        return {
            coluna,
            correlacao: r,
            classificacao: classificarCorrelacao(r)
        };
    });

    correlacoes.sort((a, b) => Math.abs(b.correlacao) - Math.abs(a.correlacao));

    return correlacoes.slice(0, 10);
}

// Árvore Binária para armazenar os IDs únicos
class Node {
    constructor(valor) {
        this.valor = valor;
        this.esquerda = null;
        this.direita = null;
    }
}

class ArvoreBinaria {
    constructor() {
        this.raiz = null;
    }

    inserir(valor) {
        this.raiz = this.#inserirRecursivo(this.raiz, valor);
    }

    #inserirRecursivo(no, valor) {
        if (!no) return new Node(valor);

        if (valor < no.valor) no.esquerda = this.#inserirRecursivo(no.esquerda, valor);
        else if (valor > no.valor) no.direita = this.#inserirRecursivo(no.direita, valor);

        return no;
    }

    contem(valor) {
        return this.#buscarRecursivo(this.raiz, valor);
    }

    #buscarRecursivo(no, valor) {
        if (!no) return false;
        if (valor === no.valor) return true;
        return valor < no.valor
            ? this.#buscarRecursivo(no.esquerda, valor)
            : this.#buscarRecursivo(no.direita, valor);
    }
}

// Função principal
function main() {
    const conteudo = fs.readFileSync('dados.json', 'utf8');
    const registros = JSON.parse(conteudo);

    const arvoreIds = new ArvoreBinaria();
    registros.forEach(user => {
        const id = parseInt(user.id);
        if (!arvoreIds.contem(id)) {
            arvoreIds.inserir(id);
        } else {
            console.error(`ID duplicado encontrado: ${id}`);
        }
    });

    const top10 = encontrarTop10Colunas(registros);

    console.log("\nTop 10 colunas mais correlacionadas com 'PerformanceWritten Test':\n");
    top10.forEach(({ coluna, correlacao, classificacao }, i) => {
        console.log(`${i + 1}. ${coluna.padEnd(30)} -> Correlação: ${correlacao.toFixed(4)}, Classificação: ${classificacao}`);
    });

    // Opcional: permitir que o usuário calcule a correlação de uma coluna específica
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('\nInforme o nome da coluna numérica para calcular a correlação: ', (coluna) => {
        const r = calcularCorrelacao(coluna, registros);
        const classificacao = classificarCorrelacao(r);

        console.log(`Correlação de Pearson: ${r.toFixed(4)}`);
        console.log(`Classificação: ${classificacao}`);

        rl.close();
    });
}

main();
