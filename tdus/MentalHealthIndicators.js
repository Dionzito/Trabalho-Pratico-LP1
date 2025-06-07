class MentalHealthIndicators {
    constructor(data) {
        this.mentalHealthLevel = data.mentalHealthLevel;
        this.mentalHealthLevelMood = data.mentalHealthLevelMood;
        this.mentalHealthLevelStress = data.mentalHealthLevelStress;
        this.mentalHealthLevelAnxiety = data.mentalHealthLevelAnxiety;
        this.mentalHealthLevelDepression = data.mentalHealthLevelDepression;
        this.indicationOfTherapy = data.indicationOfTherapy;
        this.mentalHealthyPossibleRisk = data.mentalHealthyPossibleRisk;
        this.levelOfAddictionInSocialNetworks = data.levelOfAddictionInSocialNetworks;
    }
}

module.exports = MentalHealthIndicators;