// var request = require('request');
global.fetch = require('node-fetch');
import dotenv from 'dotenv';
require('dotenv').config();

var username = process.env.username,
  apiKey = process.env.apiKey,
  apiEndPoint = 'http://api.scraping-bot.io/scrape/retail';
const idBuf = Buffer.from(username + ':' + apiKey),
  auth = 'Basic ' + idBuf.toString('base64');

export async function getAnnonceLeBoncoin(urlLB: string) {
  const url = apiEndPoint;
  const opts = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: auth,
    },
    json: JSON.stringify({
      url: urlLB,
      options: {
        useChrome: false, //set to 'true' if you want to use headless chrome for javascript rendering
        premiumProxy: false, //set to 'true' if you want to use premium proxies Unblock Amazon,Google,Rakuten
        proxyCountry: null, //allows you to choose a country proxy (example: proxyCountry:"FR")
        waitForNetworkRequests: false, //wait for most ajax requests to finish until returning the Html content (this option can only be used if useChrome is set to true),
        //this can slowdown or fail your scraping if some requests are never ending only use if really needed to get some price loaded asynchronously for example
      },
    }),
    body: JSON.stringify({
      url: urlLB,
    }),
  };
  return fetch(url, opts);
}
