import fs from "fs";

const data = JSON.parse(fs.readFileSync("./schedule.json", { encoding: "utf-8" }))

function parseTimeRange(timeRange) {
    let spliced = timeRange.split('-');

    let start = parseTime(spliced[0])
    let end = parseTime(spliced[1])

    return { start, end }
}

function parseTime(time) {
    let spliced = time.split(".")

    return { hour: +spliced[0], minute: +spliced[1] }
}

function presentCouple(couple) {
    if(!couple) {
        return "Нет пары";
    }
    
    return `${couple.name}\n${couple.instructor}`
}

function presentCouples(couples) {
    let strings = []

    for(let i = 0; i < couples.length; i++) {
        let coupleNumber = i + 1;
        
        let time = data.schedule[i]

        strings.push(`${coupleNumber}. ${presentCouple(couples[i])} ${time}`)
    }

    return strings.join("\n")
}

export default {
    days: data.days,
    getScheduleForDate(date) {
        let day = date.getDay();
        
        // sunday
        if(day === 0) {
            return "Ты ебнулся? Какие пары?"
        }
        
        day--;
        
        let scheduleForDay = Object.values(data.days)[day];
        
        return presentCouples(scheduleForDay.couples)
    }
}