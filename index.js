import dotenv from 'dotenv';
// load env before anything else
dotenv.config({ path: './env/env.env' });

import http from 'http';
import url from 'url';
import uuid from 'uuid';

import routes from './src/routes';
import config from './config';
import constants from './config/constants';

import { responseHelper } from './src/helpers';

const port = process.env.PORT;

http.createServer((request, response) => {
    const requestId = uuid.v4();
    const requestMethod = request.method;
    const requestURL = url.parse(request.url, true);

    console.log('=========================');
    console.log(`* REQUEST ID : ${requestId}`);
    console.log(`* REQUEST METHOD : ${requestMethod}`);
    console.log(`* REQUEST URL : ${requestURL.pathname}`);
    let aValidRouteIsCalled = false;
    let actionResponse = { };
    routes.forEach((routeItem) => {
        if (routeItem.method === requestMethod && routeItem.url === requestURL.pathname) {
            aValidRouteIsCalled = true;
            let routeAction = routeItem.action;
            actionResponse = routeAction(request, response);
        }
    });
    if (!aValidRouteIsCalled) {
        actionResponse = responseHelper(response, constants.http.not_found.code, constants.http.not_found.message);
    }
    console.log(`* RESPONSE : ${JSON.stringify(actionResponse)}`);
}).listen(port, (error) => {
    if (error) {
        console.error('SERVER ERROR : ', error);
        throw new Error(error);
    }
    console.log("-------------------------");
    console.log(`| APP PROCESS ID : ${config.RUN_ID}`);
    console.log("|");
    console.log(`| LISTENING ON PORT ${port}`);
    console.log("-------------------------");
});

