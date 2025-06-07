const arquivo = require('node:fs');
arquivo.readFile('TASK-BCC-LP1-2025.1-N2.csv','utf8',(err, dados) => {
    if(err){
        console.log(err);
        return;
    }
    const linhas = dados.split('\n').filter(l => l.trim() !== '');
    const cabecalho = linhas[0].split(',');
    const object = linhas.slice(1).map(linha => {
        const valores = linha.split(',');
        const obj = {
            User:
            {
                id: valores[cabecalho.indexOf("id")],
                name: valores[cabecalho.indexOf("name")],
                gender: valores[cabecalho.indexOf("gender")],
                age: parseInt(valores[cabecalho.indexOf("age")]),
                relationshipStatus: valores[cabecalho.indexOf("relationshipStatus")],
                addressType: valores[cabecalho.indexOf("addressType")],
                mostUsedSocialPlatform: valores[cabecalho.indexOf("MostUsedSocialPlatform")],
                performanceInWrittenTest: parseFloat(valores[cabecalho.indexOf("PerformanceWrittenTest")]),

                dailyHours: {
                    dailyHoursStudy: parseFloat(valores[cabecalho.indexOf("dailyHoursStudy")]),
                    dailyHoursPhone: parseFloat(valores[cabecalho.indexOf("dailyHoursPhone")]),
                    dailyHoursLaptop: valores[cabecalho.indexOf("dailyHoursLaptop")],
                    dailyHoursTablet: parseFloat(valores[cabecalho.indexOf("dailyHoursTablet")]),
                    dailyHoursTV: parseFloat(valores[cabecalho.indexOf("dailyHoursTV")]),
                    dailyHoursSocialMedia: parseFloat(valores[cabecalho.indexOf("dailyHoursSocialMedia")]),
                    dailyHoursWork: parseFloat(valores[cabecalho.indexOf("dailyHoursWork")]),
                    dailyHoursEntertainment: parseFloat(valores[cabecalho.indexOf("dailyHoursEntertainment")]),
                    dailyHoursGaming: parseFloat(valores[cabecalho.indexOf("dailyHoursGaming")]),
                    dailyHoursSleep: parseFloat(valores[cabecalho.indexOf("dailyHoursSleep")]),
                    DaysPhysicalActivity: parseInt(valores[cabecalho.indexOf("dailyHoursPhysicalActivity")]),
                    DailyMinutesMindfulness: parseInt(valores[cabecalho.indexOf("DailyMinutesMindfulness")]),
                    DailyHoursNetflix: parseInt(valores[cabecalho.indexOf("DailyHoursNetflix")]),
                },

                vocationalTraining: {
                    studyLevel: valores[cabecalho.indexOf("studyLevel")],
                    studyLevelParents: valores[cabecalho.indexOf("studyLevelParents")],
                    extracurricularTasks: valores[cabecalho.indexOf("extracurricularTasks")],
                },

                job: {
                    jobName: valores[cabecalho.indexOf("jobName")],
                    jobStatus: valores[cabecalho.indexOf("jobStatus")],
                    jobEnvironment: valores[cabecalho.indexOf("jobEnvironment")],
                    jobProductivity: valores[cabecalho.indexOf("jobProductivity")],
                },

                healthIndicators: {
                    healthyDiet: valores[cabecalho.indexOf("healthyDiet")],
                    bloodPressure: valores[cabecalho.indexOf("bloodPressure")],
                    heartRate: valores[cabecalho.indexOf("heartRate")],
                    weightCategory: valores[cabecalho.indexOf("weightCategory")],
                    sleepQuality: valores[cabecalho.indexOf("sleepQuality")],
                    dailyCaffeineIntakeMg: parseInt(valores[cabecalho.indexOf("dailyCaffeineIntakeMg")]),
                    mentalHealthIndicators: {
                        mentalHealthLevel: valores[cabecalho.indexOf("MentalHealthLevel")],
                        mentalHealthLevelMood: valores[cabecalho.indexOf("MentalHealthLevelMood")],
                        mentalHealthLevelStress: valores[cabecalho.indexOf("MentalHealthLevelStress")],
                        mentalHealthLevelAnxiety: valores[cabecalho.indexOf("MentalHealthLevelAnxiety")],
                        mentalHealthLevelDepression: valores[cabecalho.indexOf("MentalHealthLevelDepression")],
                        indicationOfTherapy: valores[cabecalho.indexOf( "IndicationOfTherapy")],
                        mentalHealthyPossibleRisk: valores[cabecalho.indexOf("MentalHealthyPossibleRisk")],
                        levelOfAddictionInSocialNetworks: valores[cabecalho.indexOf("LevelOfAddictionInSocialNetworks")]
                    }   
                }
            }
        }
        return obj;
    });
    arquivo.writeFile('dados.json', JSON.stringify(object, null, 2), err => {
        if(err){
            console.error("Erro ao salvar JSON: ",err);
        }else{
            console.log("Arquivo JSON salvo");
        }
    });
});

