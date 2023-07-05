import app from './app';
import {agent} from 'supertest';
import {expect} from 'chai';

const server = app.listen();
const request = agent(server);
describe('Blog', function() {
  after(function() {
    server.close();
  });

  describe('GET /', function() {
    it('should see title "Posts"', function(done) {
      request
        .get('/')
        .expect(200, function(err, res) {
          if (err) {
            return done(err);
          }
          expect(res.type).to.equal('text/html');
          expect(res.text).to.include('<title>Posts</title>');
          done();
        });
    });

    it('should see 0 post', function(done) {
      request
        .get('/')
        .expect(200, function(err, res) {
          if (err) {
            return done(err);
          }

          expect(res.type).to.equal('text/html');
          expect(res.text).to.include('<p>You have <strong>0</strong> posts!</p>');
          done();
        });
    });
  });

  describe('POST /post/new', function() {
    it('should create post and redirect to /', function(done) {
      request
        .post('/post')
        .send({title: 'Title', body: 'Contents'})
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          expect(res.header.location).to.equal('/');
          done();
        });
    });
  });

  describe('GET /post/0', function() {
    it('should see post', function(done) {
      request
        .get('/post/0')
        .expect(200, function(err, res) {
          if (err) {
            return done(err);
          }

          expect(res.type).to.equal('text/html');
          expect(res.text).to.include('<h1>Title</h1>');
          expect(res.text).to.include('<p>Contents</p>');
          done();
        });
    });
  });
});
