import app from './app';
import {agent} from 'supertest';
import {expect} from 'chai';

const server = app.listen();
const request = agent(server);

describe('Stream View', function() {
  after(function() {
    server.close();
  });

  it('GET /', function(done) {
    request
      .get('/')
      .expect(200, function(err, res) {
        if (err) {
          return done(err);
        }

        expect(res.headers['content-type']);
        expect(res.text).to.include('<title>Hello World</title>');
        expect(res.text).to.include('<p>Hello World</p>');
        done();
      });
  });
});
