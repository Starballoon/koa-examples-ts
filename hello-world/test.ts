import app from './app';
import {agent} from 'supertest';

const server = app.listen();
const request = agent(server);

describe('Hello World', function() {
  after(function() {
    server.close();
  });

  it('should say "Hello World"', function(done) {
    request
      .get('/')
      .expect(200)
      .expect('Hello World', done);
  });
});
