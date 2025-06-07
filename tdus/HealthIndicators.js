const MentalHealthIndicators = require('./MentalHealthIndicators');

class HealthIndicators {
    constructor(data) {
        this.healthyDiet = data.healthyDiet;
        this.bloodPressure = data.bloodPressure;
        this.heartRate = data.heartRate;
        this.weightCategory = data.weightCategory;
        this.sleepQuality = data.sleepQuality;
        this.dailyCaffeineIntakeMg = data.dailyCaffeineIntakeMg;
        this.mentalHealthIndicators = new MentalHealthIndicators(data.mentalHealthIndicators);
    }
}

module.exports = HealthIndicators;