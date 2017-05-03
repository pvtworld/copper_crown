const squareMetersPerTon = 186.720442;

var currentPrice;
var currentRate;

export function getPricePerSquareMeter(setPricePerSquareMeter) {

    const priceURL = 'https://www.quandl.com/api/v3/datasets/LME/PR_CU.json?api_key=sowBXJ3eiZby8MzvHbqP';
    const rateURL = 'https://www.quandl.com/api/v3/datasets/BUNDESBANK/BBEX3_D_SEK_USD_CA_AC_000.json?api_key=sowBXJ3eiZby8MzvHbqP&start_date=' + currentDate();

    fetch(priceURL)
        .then(status)
        .then(json)
        .then((jsonObject) => {
            currentPrice = jsonObject.dataset.data[0][1];

            fetch(rateURL)
                .then(status)
                .then(json)
                .then((jsonObject) => {
                    currentRate = jsonObject.dataset.data[0][1];
                    setPricePerSquareMeter((currentPrice * currentRate) / squareMetersPerTon);
                }).catch((error) =>{
                alert('Error: Please refresh page.');
            });
        });
}

function status(response){
    if(response.status === 200){
        return Promise.resolve(response);
    }
    return Promise.reject(new Error(response.statusText));
}

function json(response){
    return response.json();
}

function currentDate() {
    const today = new Date();
    const year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    if (month.toString().length === 1) {
        month = '0' + month;
    }

    if (day.toString().length === 1) {
        day = '0' + day;
    }

    //return year + '-' + month + '-' + day;

    return '2017-05-02';
}
