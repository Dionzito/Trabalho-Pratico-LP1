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
}

module.exports = User;
