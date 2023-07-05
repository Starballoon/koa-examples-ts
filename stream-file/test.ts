import app from './app';
import {agent} from 'supertest';

const server = app.listen();
const request = agent(server);

describe('Stream File', function() {
  after(function() {
    server.close();
  });

  it('GET /app.ts', function(done) {
    request
      .get('/app.ts')
      .expect('content-type', /application\/javascript/)
      .expect(200, done);
  });

  it('GET /test.ts', function(done) {
    request
      .get('/test.ts')
      .expect('content-type', /application\/javascript/)
      .expect(200, done);
  });

  it('GET /alksjdf.ts', function(done) {
    request
      .get('/lajksdf.ts')
      .expect(404, done);
  });

  it('GET /', function(done) {
    request
      .get('/')
      .expect(404, done);
  });
});
