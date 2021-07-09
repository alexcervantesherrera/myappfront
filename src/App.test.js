import { render, screen } from '@testing-library/react';
import  React  from 'react';
import App from './App';
import axios from 'axios';

test('Request should not return error', () => {
    const baseurl="http://localhost:38149/api/contacts";
    expect.assertions(1);
    axios.defaults.adapter = require('axios/lib/adapters/http');
    return axios.get(baseurl)
        .then(function (response) {
            expect(response.status).toBe(200);
        })
        .catch(function (error) {
            console.log(error)
            fail('fail, error happened.');
        });     
})
test('Request should not return error', () => {
  const baseurl="http://localhost:38149/api/contacts";
  axios.defaults.adapter = require('axios/lib/adapters/http');
  return axios.delete(baseurl+ "/" + "12")
      .then(function (response) {
          expect(response.status).toBe(200);
      })
      .catch(function (error) {
          console.log(error)
          fail('fail, error happened.');
      });     
})