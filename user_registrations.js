const User = require('./tdus/User');

// RF04 - Cadastrar novo usuário
function registerUser(userRecords, usuarioObj) {
    const newUser = new User(usuarioObj);
    userRecords.push(newUser);
    console.log("Usuário cadastrado com sucesso.");
}

// RF05 - Remover usuário por ID
function removeUserById(userRecords, id) {
    const index = userRecords.findIndex(u => u.id === id);
    if (index !== -1) {
        userRecords.splice(index, 1);
        console.log("Usuário removido.");
    } else {
        console.log("Usuário não encontrado.");
    }
}

// RF06 - Atualizar dados pessoais
function updatePersonalData(userRecords, id, newAge, newRelationship) {
    const usuario = userRecords.find(u => u.id === id);
    if (usuario) {
        usuario.age = newAge;
        usuario.relationshipStatus = newRelationship;
        console.log("Dados pessoais atualizados.");
    } else {
        console.log("Usuário não encontrado.");
    }
}

// RF07 - Atualizar registro tracking (dailyHours)
function updateTracking(userRecords, id, novosDadosTracking) {
    const usuario = userRecords.find(u => u.id === id);
    if (usuario) {
        usuario.dailyHours = { ...usuario.dailyHours, ...novosDadosTracking };
        console.log("Tracking atualizado.");
    } else {
        console.log("Usuário não encontrado.");
    }
}

// RF08 - Atualizar dados vocacionais
function updateVocational(userRecords, id, novosDadosVocacionais) {
    const usuario = userRecords.find(u => u.id === id);
    if (usuario) {
        usuario.vocationalTraining = { ...usuario.vocationalTraining, ...novosDadosVocacionais };
        console.log("Dados vocacionais atualizados.");
    } else {
        console.log("Usuário não encontrado.");
    }
}

// RF09 - Atualizar dados de trabalho
function updateJob(userRecords, id, novosDadosJob) {
    const user = userRecords.find(u => u.id === id);
    if (user) {
        user.job = { ...user.job, ...novosDadosJob };
        console.log("Dados de trabalho atualizados.");
    } else {
        console.log("Usuário não encontrado.");
    }
}

// RF10 - Atualizar dados de saúde
function updateHealth(userRecords, id, newDataHealth) {
    const user = userRecords.find(u => u.id === id);
    if (user) {
        user.healthIndicators = { ...user.healthIndicators, ...newDataHealth };
        console.log("Dados de saúde atualizados.");
    } else {
        console.log("Usuário não encontrado.");
    }
}

// RF11 - Atualizar saúde mental (mentalHealthIndicators)
function updateMentalHealth(userRecords, id, newDataMental) {
    const usuario = userRecords.find(u => u.id === id);
    if (usuario) {
        usuario.healthIndicators.mentalHealthIndicators = {
            ...usuario.healthIndicators.mentalHealthIndicators,
            ...newDataMental
        };
        console.log("Saúde mental atualizada.");
    } else {
        console.log("Usuário não encontrado.");
    }
}

// RF12 - Buscar por nome (exibe até 3 resultados)
function searchusername(userRecords, termName) {
    const results = userRecords.filter(u =>
        u.name.toLowerCase().includes(termName.toLowerCase())
    ).slice(0, 3);

    console.log(`${results.length} registro(s) encontrado(s):`);
    results.forEach((u, i) => {
        console.log(`\nResultado ${i + 1}:`);
        console.log(`ID: ${u.id}`);
        console.log(`Nome: ${u.name}`);
        console.log(`Idade: ${u.age}`);
        console.log(`Relacionamento: ${u.relationshipStatus}`);
        console.log(`Plataforma social mais usada: ${u.mostUsedSocialPlatform}`);
    });

    return results.map(u => u.id); // Retorna os IDs para possível ação futura
}

// Exporta todas as funções
module.exports = {
    registerUser,
    removeUserById,
    updatePersonalData,
    updateTracking,
    updateVocational,
    updateJob,
    updateHealth,
    updateMentalHealth,
    searchusername
};
