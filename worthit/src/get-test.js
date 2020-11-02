var request = require('request');

var options = {
  method: 'GET',
  url: 'https://price-analytics.p.rapidapi.com/job/5f95e87167c9be524d332257',
  headers: {
    'x-rapidapi-host': 'price-analytics.p.rapidapi.com',
    'x-rapidapi-key': 'fcdfebb0e2msh579c938e56a9fa6p1f14d1jsn1096347c3bc3',
    useQueryString: true,
  },
};

export function getOrdersJS() {
  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
}
