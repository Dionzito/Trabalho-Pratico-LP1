class DailyHours {
    constructor(data) {
        this.dailyHoursStudy = data.dailyHoursStudy;
        this.dailyHoursPhone = data.dailyHoursPhone;
        this.dailyHoursLapTop = data.dailyHoursLapTop;
        this.dailyHoursTablet = data.dailyHoursTablet;
        this.dailyHoursTV = data.dailyHoursTV;
        this.dailyHoursSocialMedia = data.dailyHoursSocialMedia;
        this.dailyHoursWork = data.dailyHoursWork;
        this.dailyHoursEntertainment = data.dailyHoursEntertainment;
        this.dailyHoursGaming = data.dailyHoursGaming;
        this.dailyHoursSleep = data.dailyHoursSleep;
        this.DaysPhysicalActivity = data.DaysPhysicalActivity;
        this.DailyMinutesMindfulness = data.DailyMinutesMindfulness;
        this.DailyHoursNetflix = data.DailyHoursNetflix;
    }
}

module.exports = DailyHours;