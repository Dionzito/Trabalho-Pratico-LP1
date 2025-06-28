const fs = require('node:fs/promises');
const path = require('node:path');
const User = require('./tdus/User');

async function loadJsonRecords(filename) {
    try {
        const data = await fs.readFile(path.join(__dirname, filename), 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Erro ao carregar JSON:', err);
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
            let data = userData;
            if (userData.User) {
                data = userData.User;
            }
            const user = new User(data);
            userRecords.push(user);
        } catch (error) {
            console.error("Erro ao criar instância de User para os dados:", userData, error);
        }
    }
    return userRecords;
}

// Exporta ambas as funções
module.exports = {
    loadJsonRecords,
    populateUserRecords
};
