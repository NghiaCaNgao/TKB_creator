function readDataUser(data) {
    const rows = [...data.matchAll(/<tr[^>]*?>[\s\S]*?<\/tr>/g)];
    const output = rows.map((item, index) => {
        if (index >= 2 && item[0]) {
            const cols = [...item[0].matchAll(/<td[^>]*?>[\s\S]*?<\/td>/g)];
            const rawData = cols.map((item) => {
                if (item[0])
                    return item[0].match(/>[\s\S]*?</)[0].slice(1, -1)
                else return;
            });
            if (rawData.every(item => (item))) {
                return {
                    index: Number(rawData[0]),
                    studentID: Number(rawData[1]),
                    name: rawData[2],
                    bird: (new Date(moment(rawData[3], "DD/MM/YYYY")._d)).getTime(),
                    stringBird: rawData[3],
                    class: rawData[4],
                    subClassID: rawData[5],
                    subClassName: rawData[6],
                    group: rawData[7],
                    credits: Number(rawData[8]),
                    note: rawData[9],
                    unknownID: rawData[10],
                }
            } else {
                return undefined
            }
        }
    });
    return output;
}