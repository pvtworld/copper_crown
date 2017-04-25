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

    const sthlmPointUrlTemplate = 'https://crossorigin.me/http://miljodata.stockholm.se/api/koppartak-1997-ytor?Geom=POINT(%longitude%%20%latitude%)';

    const [x,y] = convertPoint(long, lat);
    
    const sthlmRequest = new XMLHttpRequest();

    sthlmRequest.open('GET', createUrl(sthlmPointUrlTemplate, x, y), true);
    sthlmRequest.send();
    sthlmRequest.addEventListener('readystatechange', processSthlmRequest, false);

    function processSthlmRequest(e) {
        if (sthlmRequest.readyState === 4 && sthlmRequest.status === 200) {
            const parser = new DOMParser();
            const response = parser.parseFromString(sthlmRequest.responseText, 'text/xml');

            if (response.getElementsByTagName('dataEntitity')[0].getAttribute('resultRecords') === '1') {

                console.log('$$$$$ KOPPARTAK $$$$$\n ID: '
                    + response.getElementsByTagName('id')[0].childNodes[0].nodeValue
                    + '\nArea: ' + response.getElementsByTagName('area')[0].childNodes[0].nodeValue);

                return { id: response.getElementsByTagName('id')[0].childNodes[0].nodeValue,
                    area: response.getElementsByTagName('area')[0].childNodes[0].nodeValue };

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