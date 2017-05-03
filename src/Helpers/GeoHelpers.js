import { convertPoint } from './CoordinateConverter';

export const geoError = (err) => {
    console.warn('ERROR(' + err.code + '): ' + err.message);
}

export const geoOptions = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 4500
}


export function checkClickForCopper(long, lat, callback) {

    const sthlmPointUrlTemplate = 'https://us-central1-coppercors.cloudfunctions.net/copperProvider/?whatcopper=Geom=POINT(%longitude%%20%latitude%)';

    const [x,y] = convertPoint(long, lat);

    const request = new XMLHttpRequest();

    request.open('GET', createUrl(sthlmPointUrlTemplate, x, y), true);
    request.send();
    request.addEventListener('readystatechange', processRequest, false);

    function processRequest(e) {

        if (request.readyState === 4 && request.status === 200) {
            const parser = new DOMParser();
            const response = parser.parseFromString(request.responseText, 'text/xml');

            if (response.getElementsByTagName('dataEntitity')[0].getAttribute('resultRecords') === '1') {
                callback({ id: response.getElementsByTagName('id')[0].childNodes[0].nodeValue,
                    area: response.getElementsByTagName('area')[0].childNodes[0].nodeValue })
            } else {
                callback(null)
            }
        }
    }
}

function createUrl(templateURL, long, lat) {
    var queryURL = templateURL.replace('%longitude%', long);
    queryURL = queryURL.replace('%latitude%', lat);
    return queryURL;
}