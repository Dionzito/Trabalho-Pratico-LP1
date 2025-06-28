const fs = require('node:fs/promises');
const path = require('node:path');
const readline = require('readline');

// Utilitário para perguntas no console
function askQuestion(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve => rl.question(question, answer => {
        rl.close();
        resolve(answer);
    }));
}

// RF13 – Exportar registros para JSON com data/hora
async function exportUserRecords(userRecords) {
    const dir = path.join(__dirname, 'records');
    const now = new Date();
    const filename = `Records-${now.toISOString().replace(/[:.]/g, '-').slice(0, 19)}.json`;
    const filePath = path.join(dir, filename);

    try {
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(filePath, JSON.stringify(userRecords, null, 2));
        console.log(`Registros exportados com sucesso para ${filename}`);
    } catch (err) {
        console.error('Erro ao exportar registros:', err);
    }
}

// RF14 – Importar o arquivo mais recente da pasta records
async function importMostRecentFile() {
    const dir = path.join(__dirname, 'records');
    try {
        const files = await fs.readdir(dir);
        if (files.length === 0) {
            console.log('Nenhum arquivo encontrado para importar.');
            return null;
        }

        const filesWithTime = await Promise.all(files.map(async file => {
            const stat = await fs.stat(path.join(dir, file));
            return { name: file, time: stat.mtime };
        }));

        const latestFile = filesWithTime.sort((a, b) => b.time - a.time)[0].name;
        const data = await fs.readFile(path.join(dir, latestFile), 'utf8');
        console.log(`Arquivo importado: ${latestFile}`);
        return JSON.parse(data);
    } catch (err) {
        console.error('Erro ao importar dados:', err);
        return null;
    }
}

// RF15 – Importar arquivo escolhido pelo usuário
async function importFileByName() {
    const dir = path.join(__dirname, 'records');
    try {
        const files = await fs.readdir(dir);
        console.log("Arquivos disponíveis:\n", files.join('\n'));
        const chosen = await askQuestion('Digite o nome do arquivo para importar: ');
        const filePath = path.join(dir, chosen);

        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Erro ao importar o arquivo:', err);
        return null;
    }
}

// RF17 – Consultar usuário pelo ID
function getUserById(userRecords, id) {
    return userRecords.find(u => u.id === id);
}

// RF18 – Estatísticas por coluna
function getStatistics(userRecords, column) {
    // Função que resolve caminhos aninhados, ex: "dailyHours.dailyHoursStudy"
    function getNestedValue(obj, path) {
        return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
    }

    const values = userRecords
        .map(u => getNestedValue(u, column))
        .filter(v => v !== undefined && v !== '');

    if (values.length === 0) {
        console.log(`Coluna '${column}' não encontrada.`);
        return;
    }

    const isNumeric = !isNaN(values[0]);

    if (isNumeric) {
        const nums = values.map(Number).filter(n => !isNaN(n));
        const min = Math.min(...nums);
        const max = Math.max(...nums);
        const media = nums.reduce((a, b) => a + b, 0) / nums.length;

        console.log(`Numéricos - Coluna: ${column}`);
        console.log(`Mínimo: ${min}, Máximo: ${max}, Média: ${media.toFixed(2)}`);
    } else {
        const count = {};
        for (const v of values) {
            count[v] = (count[v] || 0) + 1;
        }

        console.log(`Categóricos - Coluna: ${column}`);
        for (const key in count) {
            console.log(`${key}: ${count[key]}`);
        }
    }
}


module.exports = {
    askQuestion,
    exportUserRecords,
    importMostRecentFile,
    importFileByName,
    getUserById,
    getStatistics

};
