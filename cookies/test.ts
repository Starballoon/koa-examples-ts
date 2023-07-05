import app from './app';
import {agent} from 'supertest';

const server = app.listen();
const request = agent(server);

describe('Cookies Views', function() {
  after(function() {
    server.close();
  });

  [1, 2, 3].forEach(function(i) {
    describe('on iteration #' + i, function() {
      it('should set the views as a cookie and as the body', function(done) {
        request
          .get('/')
          .expect(200)
          .expect('Set-Cookie', new RegExp('view=' + i))
          .expect(i + ' views', done);
      });
    });
  });
});
