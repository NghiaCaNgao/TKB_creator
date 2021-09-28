const base_url = "http://112.137.129.87/qldt/";

const params = {
    "SinhvienLmh[masvTitle]": studentID.toString(),
    "SinhvienLmh[term_id]": termID,
    "SinhvienLmh_page": "1",
    "ajax": "sinhvien-lmh-grid"
}

function jsonToUrlencoded(obj) {
    var str = [];
    for (let key in obj)
        str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
    return str.join("&");
}

function fetchInfo() {
    const fullURL = base_url + "?" + jsonToUrlencoded(params);
    const response = UrlFetchApp.fetch(fullURL);
    const queryData = readDataUser(response.getContentText()).filter(item => (item));
    return queryData;
}