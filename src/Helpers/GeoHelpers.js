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




export function checkClickForCopper(long, lat){

    //lng = x, lat = y
    const googleToSthlmConversionUrlTemplate = 'https://epsg.io/trans?x=%longitude%&y=%latitude%&s_srs=4326&t_srs=3011';
    const sthlmPointUrlTemplate = 'https://crossorigin.me/http://miljodata.stockholm.se/api/koppartak-1997-ytor?Geom=POINT(%longitude%%20%latitude%)';

    const epsgRequest = new XMLHttpRequest();

    epsgRequest.open('GET', createUrl(googleToSthlmConversionUrlTemplate, long, lat), true);
    epsgRequest.send();
    epsgRequest.addEventListener('readystatechange', processEpsgCall, false);
    //epsgRequest.onreadystatechange = processEpsgCall;


    function processEpsgCall(e){
        if(epsgRequest.readyState === 4 && epsgRequest.status === 200){
            const response = JSON.parse(epsgRequest.responseText);
            console.log(response);

            const sthlmRequest = new XMLHttpRequest();

            console.log(response.x);

            var x = response.x;
            x +='0000000';
            var y = response.y;
            y += '0000000';
            sthlmRequest.open('GET', createUrl(sthlmPointUrlTemplate, x, y), true);
            sthlmRequest.send();
            sthlmRequest.addEventListener('readystatechange', processSthlmCall, false);
            //sthlmRequest.onreadystatechange = processSthlmCall;


            function processSthlmCall(e){
                if(sthlmRequest.readyState === 4 && sthlmRequest.status === 200){
                    var parser = new DOMParser();
                    const xmlResponse = parser.parseFromString(sthlmRequest.responseText, 'text/xml');

                    const dataEntityTag = xmlResponse.getElementsByTagName('dataEntitity');
                    console.log(dataEntityTag[0].getAttribute('resultRecords'));
                    if(dataEntityTag[0].getAttribute('resultRecords') === '1'){
                        console.log('$$$$$ KOPPARTAK $$$$$\n ID: ' + xmlResponse.getElementsByTagName('id')[0].childNodes[0].nodeValue + '\nArea: ' + xmlResponse.getElementsByTagName('area')[0].childNodes[0].nodeValue);
                        return xmlResponse.getElementsByTagName('id')[0].childNodes[0].nodeValue;
                    }else{
                        console.log('Sorry, no roof for you.. ;(')
                        return null;
                    }

                }
            }

        }
    }

}


function createUrl(templateURL, long, lat){
    var queryURL = templateURL.replace('%longitude%', long);
    queryURL = queryURL.replace('%latitude%', lat);
    return queryURL;
}