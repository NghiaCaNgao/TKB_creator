// Read value from TKB sheet
function readSheet() {
    const spreadsheetId = '1m9lVGgrSA9W6BD88FehKIMBC9SppoDMP_KpHW_fPUaY';
    const rangeName = 'TKB!A1:J592';
    const values = Sheets.Spreadsheets.Values.get(spreadsheetId, rangeName).values;

    if (!values) {
        Logger.log('No data found.');
        return undefined;
    } else return values;
}

// Filter personal data
function filterInDeep(resource, referrence) {
    const result = referrence.filter(item => {
        for (let i = 0; i < resource.length; i++) {
            if (resource[i].subClassID == item[4] && (resource[i].group == item[9] || "CL" == item[9])) {
                return true;
            }
        }
    });
    return result;
}

function filterDiff(data) {
    const output = [];
    let diff, sub1;
    for (let i = 0; i < data.length; i++) {
        diff = true;
        sub1 = data[i].reduce((pre, cur) => pre + cur);
        for (let j = 0; j < output.length; j++) {
            const sub2 = output[j].reduce((pre, cur) => pre + cur);
            if (sub1 == sub2) {
                diff = false;
                break;
            }
        }
        if (diff) output.push(data[i]);
    }
    return output;
}

// ProcessData
function process(data) {
    const tmp = data.map(item => {
        return JSON.stringify({
            courseCode: item[0],
            courseName: item[1],
            credits: Number(item[2]),
            // studentNumber: Number(item[3]),
            courseID: item[4],
            teachers: item[5].split("\n"),
            day: isNaN(Number(item[6])) ? 8 : Number(item[6]),
            lessons: item[7].split("-").map(item => Number(item)),
            amphitheater: item[8],
            group: item[9]
        });
    });

    return [...new Set(tmp)].map(item => JSON.parse(item));
}

// Create calendar
function createCalendar(data) {
    // Assign colors
    const courseIDColors = [...new Set(data.map(item => item.courseID))];
    const colorSet = [
        CalendarApp.EventColor.PALE_BLUE,
        CalendarApp.EventColor.PALE_GREEN,
        CalendarApp.EventColor.PALE_RED,
        CalendarApp.EventColor.YELLOW,
        CalendarApp.EventColor.ORANGE,
        CalendarApp.EventColor.BLUE,
        CalendarApp.EventColor.CYAN,
        CalendarApp.EventColor.GRAY,
        CalendarApp.EventColor.MAUVE,
        CalendarApp.EventColor.RED,
    ]
    var colors = {};
    courseIDColors.forEach((item, index) => {
        colors[item] = colorSet[index];
    });
    const calendarName = "Thời khóa biểu lớp";

    // Create calendar
    const calendar = CalendarApp.createCalendar(calendarName);
    // create events
    data.forEach(item => {
        for (let lesson = item.lessons[0]; lesson <= item.lessons[1]; lesson++) {
            const options = {
                title: item.courseName + " " + item.courseID,
                start: new Date(startNextWeek + dayTime[item.day - 2] + lessonTime[lesson - 1].start),
                end: new Date(startNextWeek + dayTime[item.day - 2] + lessonTime[lesson - 1].end),
                repeatation: CalendarApp.newRecurrence().addWeeklyRule().times(18),
                location: item.amphitheater
            }
            Logger.log("Creating event: ");
            Logger.log(options);
            // create event
            calendar.createEventSeries(options.title, options.start, options.end, options.repeatation, {
                location: options.location
            }).setColor(colors[item.courseID]);
            Utilities.sleep(3 * 100); // Tranh loi overload
        }
    });

    Logger.log("Created: " + data.length + " events in " + calendarName.toLocaleUpperCase());
    Logger.log("DONE");
}