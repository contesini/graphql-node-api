import 'chai-http';
import * as chai from 'chai';
chai.use(require('chai-http'));

import * as mocha from 'mocha';

import app from './../src/app';
import db from './../src/models';

const expect = chai.expect;

const handleError = error => {
    const message = (error.message) ? error.response.res.text : error.message || error;
    return Promise.reject(`${error.name}: ${message}`);
}

export {
    app,
    db,
    chai,
    mocha,
    expect,
    handleError
}