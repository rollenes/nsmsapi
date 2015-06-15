var should = require("should");
var nock = require('nock');
var nsmsapi = require('..');
var fixtures = require('./fixtures/sms.json');

describe('SmsSender', function(){

    it('should rise error when created without credentials', function(){
        (function() {
            new nsmsapi.SmsSender()
        }).should.throwError('Credential options required');
    });

    it('should rise error when created without username', function(){
        (function() {
            new nsmsapi.SmsSender({})
        }).should.throwError('Username required');
    });

    it('should rise error when created without password', function(){
        (function() {
            new nsmsapi.SmsSender({username: 'test'})
        }).should.throwError('Password required');
    });

    describe('#send', function(){
        it('should send sms to default endpoint', function(done){

            var scope = nock('https://ssl.smsapi.pl')
                .post('/sms.do', fixtures.singleSms.request)
                .reply(200, fixtures.singleSms.response);

            var sender = new nsmsapi.SmsSender({
                username: 'test',
                password: 'test'
            });

            var sms = new nsmsapi.Sms('603322424', 'This is test');

            sender.send(sms, function(err, res, body) {
                scope.done();
                done();
            });
        });

        it('should send sms to custom endpoint', function(done){

            var scope = nock('http://localhost:8080')
                .post('/', fixtures.singleSms.request)
                .reply(200, fixtures.singleSms.response);

            var sender = new nsmsapi.SmsSender({
                username: 'test',
                password: 'test',
                endpoint: 'http://localhost:8080'
            });

            var sms = new nsmsapi.Sms('603322424', 'This is test');

            sender.send(sms, function(err, res, body) {
                scope.done();
                done();
            });
        });
    });


});