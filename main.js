const fs = require('node:fs/promises');
const path = require('node:path');
const User = require('./tdus/User');

async function loadJsonRecords(filename) {
    try {
        const filePath = path.join(__dirname, filename);
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Erro ao carregar o arquivo JSON ${filename}:`, err);
        return null;
    }
}

function populateUserRecords(jsonLikeUserList) {
    const userRecords = [];
    if (!jsonLikeUserList || !Array.isArray(jsonLikeUserList)) {
        console.error("A lista de usuários JSON não é válida ou está vazia.");
        return userRecords;
    }

    for (const userData of jsonLikeUserList) {
        try {
            const user = new User(userData.User);
            userRecords.push(user);
        } catch (error) {
            console.error("Erro ao criar instância de User para os dados:", userData.User, error);
        }
    }
    return userRecords;
}
async function main() {
    const jsonFilename = 'dados.json';
    const jsonLikeUserList = await loadJsonRecords(jsonFilename);

    if (jsonLikeUserList) {
        const userRecords = populateUserRecords(jsonLikeUserList);
        console.log(`Foram criados ${userRecords.length} registros de usuários.`);
        // Exemplo: Acesse um registro
        if (userRecords.length > 0) {
            console.log("Primeiro usuário (instância de User):", userRecords[0]);
            console.log("Nome do primeiro usuário:", userRecords[0].name);
            console.log("Horas de estudo do primeiro usuário:", userRecords[0].dailyHours.dailyHoursStudy);
            console.log("Nível de saúde mental do primeiro usuário:", userRecords[0].healthIndicators.mentalHealthIndicators.mentalHealthLevel);
        }
    } else {
        console.log("Não foi possível carregar os dados JSON para popular os registros.");
    }
}
main();