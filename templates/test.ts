import app from './app';
import {agent} from 'supertest';

const server = app.listen();
const request = agent(server);

describe('Templates', function() {
  after(function() {
    server.close();
  });

  describe('GET /', function() {
    it('should respond with a rendered view', function(done) {
      request
        .get('/')
        .expect(200)
        .expect('<p>Tobi is a 3 year old ferret.</p>', done);
    });
  });
});
