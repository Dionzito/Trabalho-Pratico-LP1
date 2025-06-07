const fs = require('node:fs/promises');
const path = require('node:path');

// Importar as classes TDUS
const User = require('./tdus/User');
// Não precisamos importar todas as outras classes aqui, pois elas são importadas por User ou HealthIndicators

/**
 * Carrega o conteúdo de um arquivo JSON.
 * @param {string} filename O nome do arquivo JSON.
 * @returns {Promise<Array | null>} Uma promessa que resolve para a lista de objetos JSON ou null em caso de erro.
 */
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

/**
 * Popula uma nova lista de registros User a partir de uma lista de objetos JSON.
 * @param {Array} jsonLikeUserList A lista de objetos JSON (como a saída do seu código CSV para JSON).
 * @returns {Array<User>} Uma nova lista onde cada item é uma instância da classe User.
 */
function populateUserRecords(jsonLikeUserList) {
    const userRecords = [];
    if (!jsonLikeUserList || !Array.isArray(jsonLikeUserList)) {
        console.error("A lista de usuários JSON não é válida ou está vazia.");
        return userRecords;
    }

    for (const userData of jsonLikeUserList) {
        // O seu JSON tem a estrutura { User: { ...dados do usuário... } }
        // Então, precisamos passar userData.User para o construtor da classe User
        try {
            const user = new User(userData.User);
            userRecords.push(user);
        } catch (error) {
            console.error("Erro ao criar instância de User para os dados:", userData.User, error);
        }
    }
    return userRecords;
}

// Função principal para executar o fluxo
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

// Executar a função principal
main();