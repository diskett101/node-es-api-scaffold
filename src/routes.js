import http from 'http';

import { responseHelper } from './helpers';

export default [
    {
        method: 'GET',
        url: '/test',
        action: (request, response) => {
            console.log('TEST');
            return responseHelper(response,200, 'OK');
        }
    },
    {
        method: 'GET',
        url: '/test2',
        action: (request, response) => {
            console.log('TEST 2');
            return responseHelper(response, 200, 'OK');
        }
    }
]