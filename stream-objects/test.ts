import app from './app';
import {agent} from 'supertest';
import {expect} from 'chai';

const server = app.listen();
const request = agent(server);

describe('Stream Objects', function() {
  after(function() {
    server.close();
  });

  it('GET /', function(done) {
    request
      .get('/app.js')
      .expect(200, function(err, res) {
        if (err) return done(err);

        expect(res.body).to.deep.equal([{
          id: 1
        }, {
          id: 2
        }]);
        done();
      });
  });
});
