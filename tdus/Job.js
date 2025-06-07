class Job {
    constructor(data) {
        this.jobName = data.jobName;
        this.jobStatus = data.jobStatus;
        this.jobEnvironment = data.jobEnvironment;
        this.jobProductivity = data.jobProductivity;
    }
}

module.exports = Job;