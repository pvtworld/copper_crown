

export function currentPrice(){

    const url = 'https://www.quandl.com/api/v3/datasets/LME/PR_CU.json?api_key=sowBXJ3eiZby8MzvHbqP';

    const request = new XMLHttpRequest();

    request.open('GET', url, true);
    request.send();
    request.addEventListener('readystatechange', processRequest, false);

    function processRequest(e) {

        if (request.readyState === 4 && request.status === 200) {

            const response = JSON.parse(request.responseText);

            const date = response.dataset.data[0][0];
            console.log(date);
            const price = response.dataset.data[0][1];
            console.log(price);
        }
    }
}

export function dollarToSEK(dollar){

    const urlTemplate = 'https://www.quandl.com/api/v3/datasets/BUNDESBANK/BBEX3_D_SEK_USD_CA_AC_000.json?api_key=sowBXJ3eiZby8MzvHbqP&start_date=';

    const request = new XMLHttpRequest();

    request.open('GET', urlTemplate+currentDate(), true);
    request.send();
    request.addEventListener('readystatechange', processRequest, false);


    function processRequest(e){
        if (request.readyState === 4 && request.status === 200) {
            const response = JSON.parse(request.responseText);
            console.log(response);

        }
    }

}

function currentDate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    if (month.toString().length === 1) {
        month = '0' + month;
    }

    if (day.toString().length === 1) {
        day = '0' + day;
    }

    return year + '-' + month + '-' + day;

}
