import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { TaskParams } from '../price3Api';
// var request = require('request');
// import * as express from "express";
// import * as request from 'request';
import axios from 'axios';
import {
  GetQuery,
  GetQueryDoc,
  GetQueryAttrs,
} from '../models/queryPrice3Idealo';
import { NotFoundError } from '@worth-it/common';
import { api3PriceExp } from '../services/exempleAPI3Price';
var http = require('https');

const router = express.Router();
//TODO: Clean The Code + Add test class;
router.get('/api/wi/offers/:jobid', async (reqt: Request, res: Response) => {
  const { jobid } = reqt.params;

  // var options = {
  //   method: 'GET',
  //   url: 'https://price-analytics.p.rapidapi.com/job/5f96a13f452934520dbe0958',
  //   headers: {
  //     'x-rapidapi-host': 'price-analytics.p.rapidapi.com',
  //     'x-rapidapi-key': 'fcdfebb0e2msh579c938e56a9fa6p1f14d1jsn1096347c3bc3',
  //     useQueryString: true,
  //   },
  // };

  // let getQuery: GetQueryDoc;

  // var options = {
  //   method: 'GET',
  //   hostname: 'price-analytics.p.rapidapi.com',
  //   port: null,
  //   path: '/job/5f96a13f452934520dbe0958',
  //   headers: {
  //     'x-rapidapi-host': 'price-analytics.p.rapidapi.com',
  //     'x-rapidapi-key': 'fcdfebb0e2msh579c938e56a9fa6p1f14d1jsn1096347c3bc3',
  //     useQueryString: true,
  //   },
  // };

  //@ts-ignore
  // reqt(options, function (error, response, body) {
  //   if (error) throw new Error(error);

  //   console.log(body);
  // });

  //@ts-ignore
  // var reqt = http.request(options, function (res) {
  //   //@ts-ignore

  //   var chunks = [];
  //   //@ts-ignore

  //   res.on('data', function (chunk) {
  //     chunks.push(chunk);
  //   });

  //   res.on('end', function (body: Buffer) {
  //     //@ts-ignore

  //     body = Buffer.concat(chunks);
  //     // console.log(body.toString());
  //     return body;
  //     //@ts-ignore
  //   });
  // });
  // //@ts-ignore

  // reqt.end();

  // getQuery = JSON.parse(reqt.toString());

  // console.log(body);

  // let rest = await axios({
  //   method: 'GET',
  //   url: 'https://price-analytics.p.rapidapi.com/job/5f95e87167c9be524d332257',
  //   headers: {
  //     'content-type': 'application/octet-stream',
  //     'x-rapidapi-host': 'price-analytics.p.rapidapi.com',
  //     'x-rapidapi-key': 'fcdfebb0e2msh579c938e56a9fa6p1f14d1jsn1096347c3bc3',
  //     useQueryString: true,
  //   },
  // })
  //   .then((response) => {
  //     //@ts-ignore
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  function getOffers(jobid: string): Promise<Response> {
    const url = `https://price-analytics.p.rapidapi.com/job/${jobid}`;
    const opts: RequestInit = {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'price-analytics.p.rapidapi.com',
        'x-rapidapi-key': 'fcdfebb0e2msh579c938e56a9fa6p1f14d1jsn1096347c3bc3',
      },
    };
    return fetch(url, opts)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
  let responseGet = await getOffers(jobid);
  //@ts-ignore
  const getQuerytest = GetQuery.build(responseGet);
  // const getQuerytest = GetQuery.build(api3PriceExp);

  await getQuerytest.save();

  const getQueryfind = await GetQuery.find({}).populate('results');
  if (!getQueryfind) {
    throw new NotFoundError();
  }
  // console.log(getQuerytest[0].results[0].content[0].offers);
  // console.log(getQuerytest);
  // res.status(201).send(test);
  res.status(201).send(getQueryfind[0]);
  // res.status(201).send(getQueryfind[0].results[0].content[0].offers);
});

export { router as getOffersRouter };
