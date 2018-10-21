import http from 'http';
import assert from 'assert';
import request from 'request';

describe('Example Node Server', () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:3000', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('Example of an advertisement creation', () => {
  it('should return 201', done => {
    request.post('http://127.0.0.1:3000/advertisement', {form:{
      offer_msg: 'Sample offer message',
      offer_graphic_url: 'http://www.zemoga.com',
      start_datetime: '2011-10-20T20:28:17Z',
      end_datetime: '2015-10-20T20:28:17Z',
      category: 'CLOTHES'}}, (err, res, body) => {
      console.log(res.body);
      assert.equal(201, res.statusCode);
      done();
    });
  });
});

describe('Example to query all the advertisements', () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:3000/advertisements', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});
