function myFunction() {

    Logger.log("Fetching data...")
    const data = fetchInfo();
    Logger.log("Student name: " + data[0].name);
    Logger.log("Student ID: " + data[0].studentID);
    Logger.log("Class: " + data[0].class);
    Logger.log("--------------------------------------");
    Utilities.sleep(1 * 1000);
    Logger.log("Reading data...")
    const result = readSheet();
    if (result) {
        Logger.log("Processing data...");
        const output = filterInDeep(data, result);
        const readyData = process(output);
        createCalendar(readyData);
    }
}

// --------------
// API
function doGet(e) {
    return HtmlService.createHtmlOutput(JSON.stringify(e.parameter));
}

function doPost(e) {
    return HtmlService.createHtmlOutput(JSON.stringify(e));
}