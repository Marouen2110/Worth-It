global.fetch = require('node-fetch');

export interface TaskParams {
  source: 'idealo';
  key: 'term';
  country: 'fr';
  values: string;
}

export async function createJobId(taskParams: TaskParams): Promise<Response> {
  const url = 'https://price-analytics.p.rapidapi.com/job';
  const opts: RequestInit = {
    method: 'POST',
    headers: {
      'x-rapidapi-host': 'price-analytics.p.rapidapi.com',
      'x-rapidapi-key': process.env.xrapidapikey!,
      'content-type': 'application/json',
      useQueryString: 'true',
    },
    body: JSON.stringify(taskParams),
  };
  return fetch(url, opts);
}

export async function getOffers(jobid: string): Promise<Response> {
  const url = `https://price-analytics.p.rapidapi.com/job/${jobid}`;
  const opts: RequestInit = {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'price-analytics.p.rapidapi.com',
      'x-rapidapi-key': process.env.xrapidapikey!,
    },
  };
  return fetch(url, opts);
}
