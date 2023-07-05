import app from './app';
import {agent} from 'supertest';
import {expect} from 'chai';

const server = app.listen();
const request = agent(server);

describe('Errors', function() {
  after(function() {
    server.close();
  });

  it('should catch the error', function(done) {
    request
      .get('/')
      .expect(500)
      .expect('Content-Type', /text\/html/, done);
  });

  it('should emit the error on app', function(done) {
    app.once('error', function(err, ctx) {
      expect(err.message).to.equal('boom boom');
      expect(ctx).to.be.ok;
      done();
    });

    request
      .get('/')
      .end(function() {});
  });
});
