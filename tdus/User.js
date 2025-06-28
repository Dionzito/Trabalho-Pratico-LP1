const DailyHours = require('./DailyHours');
const VocationalTraining = require('./VocationalTraining');
const Job = require('./Job');
const HealthIndicators = require('./HealthIndicators');

class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.gender = data.gender;
        this.age = data.age;
        this.relationshipStatus = data.relationshipStatus;
        this.addressType = data.addressType;
        this.mostUsedSocialPlatform = data.mostUsedSocialPlatform;
        this.performanceInWrittenTest = data.performanceInWrittenTest;
        this.dailyHours = new DailyHours(data.dailyHours);
        this.vocationalTraining = new VocationalTraining(data.vocationalTraining);
        this.job = new Job(data.job);
        this.healthIndicators = new HealthIndicators(data.healthIndicators);
    }

    /**
     * Método estático para criar um novo usuário interativamente
     * Recebe a função askQuestion como parâmetro
     */
    static async promptNewUser(askQuestion) {
        const id = await askQuestion('ID: ');
        const name = await askQuestion('Nome: ');
        const gender = await askQuestion('Gênero: ');
        const age = parseInt(await askQuestion('Idade: '), 10);
        const relationshipStatus = await askQuestion('Status de relacionamento: ');
        const addressType = await askQuestion('Tipo de endereço: ');
        const mostUsedSocialPlatform = await askQuestion('Plataforma social mais usada: ');
        const performanceInWrittenTest = parseFloat(await askQuestion('Nota prova escrita: '));

        // DailyHours
        const dailyHours = {
            dailyHoursStudy: parseFloat(await askQuestion('Horas diárias de estudo: ')),
            dailyHoursPhone: parseFloat(await askQuestion('Horas diárias no celular: ')),
            dailyHoursLaptop: parseFloat(await askQuestion('Horas diárias no laptop: ')),
            dailyHoursTablet: parseFloat(await askQuestion('Horas diárias no tablet: ')),
            dailyHoursTV: parseFloat(await askQuestion('Horas diárias na TV: ')),
            dailyHoursSocialMedia: parseFloat(await askQuestion('Horas diárias em redes sociais: ')),
            dailyHoursWork: parseFloat(await askQuestion('Horas diárias de trabalho: ')),
            dailyHoursEntertainment: parseFloat(await askQuestion('Horas diárias de entretenimento: ')),
            dailyHoursGaming: parseFloat(await askQuestion('Horas diárias de jogos: ')),
            dailyHoursSleep: parseFloat(await askQuestion('Horas diárias de sono: ')),
            DaysPhysicalActivity: parseInt(await askQuestion('Dias de atividade física por semana: '), 10),
            DailyMinutesMindfulness: parseInt(await askQuestion('Minutos diários de mindfulness: '), 10),
            DailyHoursNetflix: parseInt(await askQuestion('Horas diárias de Netflix: '), 10)
        };

        // VocationalTraining
        const vocationalTraining = {
            studyLevel: await askQuestion('Nível de estudo: '),
            studyLevelParents: await askQuestion('Nível de estudo dos pais: '),
            extracurricularTasks: await askQuestion('Atividades extracurriculares: ')
        };

        // Job
        const job = {
            jobName: await askQuestion('Nome do trabalho: '),
            jobStatus: await askQuestion('Status do trabalho: '),
            jobEnvironment: await askQuestion('Ambiente de trabalho: '),
            jobProductivity: await askQuestion('Produtividade no trabalho: ')
        };

        // HealthIndicators
        const healthIndicators = {
            healthyDiet: await askQuestion('Dieta saudável (sim/não): '),
            bloodPressure: await askQuestion('Pressão arterial: '),
            heartRate: await askQuestion('Frequência cardíaca: '),
            weightCategory: await askQuestion('Categoria de peso: '),
            sleepQuality: await askQuestion('Qualidade do sono: '),
            dailyCaffeineIntakeMg: parseInt(await askQuestion('Cafeína diária (mg): '), 10),
            mentalHealthIndicators: {
                mentalHealthLevel: await askQuestion('Nível de saúde mental: '),
                mentalHealthLevelMood: await askQuestion('Nível de humor: '),
                mentalHealthLevelStress: await askQuestion('Nível de estresse: '),
                mentalHealthLevelAnxiety: await askQuestion('Nível de ansiedade: '),
                mentalHealthLevelDepression: await askQuestion('Nível de depressão: '),
                indicationOfTherapy: await askQuestion('Indicação de terapia: '),
                mentalHealthyPossibleRisk: await askQuestion('Possível risco mental: '),
                levelOfAddictionInSocialNetworks: await askQuestion('Nível de vício em redes sociais: ')
            }
        };

        return new User({
            id,
            name,
            gender,
            age,
            relationshipStatus,
            addressType,
            mostUsedSocialPlatform,
            performanceInWrittenTest,
            dailyHours,
            vocationalTraining,
            job,
            healthIndicators
        });
    }
}

module.exports = User;
