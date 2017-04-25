import { convertPoint } from './CoordinateConverter';

// Get location from device
export const geolocation = (
    navigator.geolocation ?
        navigator.geolocation :
        ({
            getCurrentPosition(success, failure) {
                failure(`Your browser doesn't support geolocation.`);
            },
        })
);

export function checkClickForCopper(long, lat) {
    //lng = x, lat = y
    const sthlmPointUrlTemplate = 'https://crossorigin.me/http://miljodata.stockholm.se/api/koppartak-1997-ytor?Geom=POINT(%longitude%%20%latitude%)';

    var [x,y] = convertPoint(long, lat);
    
    const sthlmRequest = new XMLHttpRequest();
    //console.log(response.x);

    sthlmRequest.open('GET', createUrl(sthlmPointUrlTemplate, x, y), true);
    sthlmRequest.send();
    sthlmRequest.addEventListener('readystatechange', processSthlmRequest, false);

    function processSthlmRequest(e) {
        if (sthlmRequest.readyState === 4 && sthlmRequest.status === 200) {
            var parser = new DOMParser();
            const xmlResponse = parser.parseFromString(sthlmRequest.responseText, 'text/xml');

            const dataEntityTag = xmlResponse.getElementsByTagName('dataEntitity');
            console.log(dataEntityTag[0].getAttribute('resultRecords'));
            if (dataEntityTag[0].getAttribute('resultRecords') === '1') {
                console.log('$$$$$ KOPPARTAK $$$$$\n ID: ' + xmlResponse.getElementsByTagName('id')[0].childNodes[0].nodeValue + '\nArea: ' + xmlResponse.getElementsByTagName('area')[0].childNodes[0].nodeValue);
                return { id: xmlResponse.getElementsByTagName('id')[0].childNodes[0].nodeValue, area: xmlResponse.getElementsByTagName('area')[0].childNodes[0].nodeValue };
            } else {
                console.log('Sorry, no roof for you.. ;(')
                return null;
            }

        }
    }

}


function createUrl(templateURL, long, lat) {
    var queryURL = templateURL.replace('%longitude%', long);
    queryURL = queryURL.replace('%latitude%', lat);
    return queryURL;
}