const fs = require('node:fs/promises');
const path = require('node:path');
const User = require('./tdus/User');

const {
    askQuestion,
    exportUserRecords,
    importMostRecentFile,
    importFileByName,
    getUserById,
    getStatistics
} = require('./data_operation');

const {
    registerUser,   // função não esta sendo usada uma vez que é mais eficiente usar o promptNewUser(statico) criado em User.js
    removeUserById,
    updatePersonalData,
    updateTracking,
    updateVocational,
    updateJob,
    updateHealth,
    updateMentalHealth,
    searchusername
} = require('./user_registrations');

const { loadJsonRecords, populateUserRecords } = require('./main');


// Função para salvar em dados.json
async function salvarUserRecords(userRecords) {
    try {
        await fs.writeFile(path.join(__dirname, 'dados.json'), JSON.stringify(userRecords, null, 2));
        console.log('Alterações salvas em dados.json');
    } catch (err) {
        console.error('Erro ao salvar dados:', err);
    }
}

// Exporta a função
module.exports = { populateUserRecords };


async function startMenu() {
    const jsonLike = await loadJsonRecords('dados.json');
    if (!jsonLike) {
        console.log('Arquivo dados.json não encontrado. Rode read_file.js antes.');
        return;
    }

    let userRecords = populateUserRecords(jsonLike);
    console.log(`Foram carregados ${userRecords.length} registros.`);

    let opcao = '';
    while (opcao !== '0') {
        console.log(`\n========== MENU PRINCIPAL ==========
1 - Cadastro e Remoção
2 - Atualização de Dados
3 - Consultas e Buscas
4 - Importar / Exportar Dados
0 - Sair`);

        opcao = await askQuestion('Escolha uma opção: ');

        switch (opcao) {
            case '1':
                await submenuCadastroRemocao(userRecords);
                break;
            case '2':
                await submenuAtualizacao(userRecords);
                break;
            case '3':
                await submenuConsultas(userRecords);
                break;
            case '4':
                userRecords = await submenuImportExport(userRecords);
                break;
            case '0':
                console.log('Saindo...');
                break;
            default:
                console.log('Opção inválida.');
        }
    }
}

// ======= SUBMENUS COM SALVAMENTO =======

async function submenuCadastroRemocao(userRecords) {
    let opcao = '';
    while (opcao !== '0') {
        console.log(`\n===== CADASTRO E REMOÇÃO =====
1 - Cadastrar novo usuário (RF04)
2 - Remover usuário (RF05)
0 - Voltar ao menu principal`);

        opcao = await askQuestion('Escolha uma opção: ');

        switch (opcao) {
            case '1':
                const newUser = await User.promptNewUser(askQuestion);
                userRecords.push(newUser);
                await salvarUserRecords(userRecords);
                console.log('Usuário cadastrado com sucesso.');
                break;

            case '2':
                const remId = await askQuestion('ID do usuário a remover: ');
                removeUserById(userRecords, remId);
                await salvarUserRecords(userRecords);
                break;

            case '0':
                break;

            default:
                console.log('Opção inválida.');
        }
    }
}

async function submenuAtualizacao(userRecords) {
    let opcao = '';
    while (opcao !== '0') {
        console.log(`\n===== ATUALIZAÇÃO DE DADOS =====
1 - Atualizar dados pessoais (RF06)
2 - Atualizar tracking (RF07)
3 - Atualizar dados vocacionais (RF08)
4 - Atualizar dados de trabalho (RF09)
5 - Atualizar saúde (RF10)
6 - Atualizar saúde mental (RF11)
0 - Voltar`);

        opcao = await askQuestion('Escolha uma opção: ');

        switch (opcao) {
            case '1':
                const updId = await askQuestion('ID: ');
                const novaIdade = parseInt(await askQuestion('Nova idade: '));
                const rel = await askQuestion('Novo relacionamento: ');
                updatePersonalData(userRecords, updId, novaIdade, rel);
                await salvarUserRecords(userRecords);
                break;

            case '2':
                const idT = await askQuestion('ID: ');
                const horas = parseFloat(await askQuestion('Horas de estudo: '));
                updateTracking(userRecords, idT, { dailyHoursStudy: horas });
                await salvarUserRecords(userRecords);
                break;

            case '3':
                const idV = await askQuestion('ID: ');
                const nivel = await askQuestion('Nível de estudo: ');
                updateVocational(userRecords, idV, { studyLevel: nivel });
                await salvarUserRecords(userRecords);
                break;

            case '4':
                const idJob = await askQuestion('ID: ');
                const job = await askQuestion('Nome do trabalho: ');
                updateJob(userRecords, idJob, { jobName: job });
                await salvarUserRecords(userRecords);
                break;

            case '5':
                const idH = await askQuestion('ID: ');
                const dieta = await askQuestion('Dieta saudável (Sim/Não): ');
                updateHealth(userRecords, idH, { healthyDiet: dieta });
                await salvarUserRecords(userRecords);
                break;

            case '6':
                const idM = await askQuestion('ID: ');
                const mental = await askQuestion('Nível saúde mental: ');
                updateMentalHealth(userRecords, idM, { mentalHealthLevel: mental });
                await salvarUserRecords(userRecords);
                break;

            case '0':
                break;

            default:
                console.log('Opção inválida.');
        }
    }
}

async function submenuConsultas(userRecords) {
    let opcao = '';
    while (opcao !== '0') {
        console.log(`\n===== CONSULTAS E BUSCAS =====
1 - Buscar usuário por nome (RF12)
2 - Consultar usuário por ID (RF17)
3 - Estatísticas por coluna (RF18)
0 - Voltar`);

        opcao = await askQuestion('Escolha uma opção: ');

        switch (opcao) {
            case '1':
                const nome = await askQuestion('Nome: ');
                searchusername(userRecords, nome);
                break;
            case '2':
                const id = await askQuestion('ID: ');
                const user = getUserById(userRecords, id);
                console.log(user || 'Usuário não encontrado.');
                break;
            case '3':
                const col = await askQuestion('Coluna: ');
                getStatistics(userRecords, col);
                break;
            case '0':
                break;
            default:
                console.log('Opção inválida.');
        }
    }
}

async function submenuImportExport(userRecords) {
    let opcao = '';
    while (opcao !== '0') {
        console.log(`\n===== IMPORTAR / EXPORTAR =====
1 - Exportar registros (RF13)
2 - Importar registros mais recentes (RF14)
3 - Importar registros escolhendo arquivo (RF15)
0 - Voltar`);

        opcao = await askQuestion('Escolha uma opção: ');

        switch (opcao) {
            case '1':
                await exportUserRecords(userRecords);
                break;
            case '2':
                const impRecent = await importMostRecentFile();
                if (impRecent) {
                    userRecords = populateUserRecords(impRecent);
                    console.log('Importado e carregado na memória.');
                }
                break;
            case '3':
                const impNamed = await importFileByName();
                if (impNamed) {
                    userRecords = populateUserRecords(impNamed);
                    console.log('Importado e carregado na memória.');
                }
                break;
            case '0':
                break;
            default:
                console.log('Opção inválida.');
        }
    }
    return userRecords;
}

startMenu();
