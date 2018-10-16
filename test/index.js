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

describe('Example of an user registration', () => {
  it('should return 201', done => {
    request('http://127.0.0.1:3000/users', {
      'username': 'Sample',
      password: '123456',
      marriage_status: 'MARRIED',
      age: '21' }, (err, res, body) => {
      assert.equal(401, res.statusCode);
      done();
    })
    ;
  });
});

describe('Example to query all users without token', () => {
  it('should return 401', done => {
    http.get('http://127.0.0.1:3000/users', res => {
      assert.equal(401, res.statusCode);
      done();
    });
  });
});

describe('Example to query all votes without token', () => {
  it('should return 401', done => {
    http.get('http://127.0.0.1:3000/votes', res => {
      assert.equal(401, res.statusCode);
      done();
    });
  });
});