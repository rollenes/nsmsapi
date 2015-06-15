var should = require("should");
var nock = require('nock');
var nsmsapi = require('..');

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

    describe('#invalid endpoint', function(){
        var invalidEndpoints = [
            undefined,
            '',
            {}
        ];

        invalidEndpoints.forEach(function(endpoint){
            it('should rice error for: ' + typeof endpoint, function() {
                (function () {
                    new nsmsapi.SmsSender({username: 'test', password: 'test', endpoint: endpoint})
                }).should.throwError('Invalid endpoint');
            });
        });
    });

    describe('#send', function() {
        var singleSms = require('./fixtures/singleSms.json');

        it('should send sms to default endpoint', function(done){

            var scope = nock('https://ssl.smsapi.pl')
                .post('/sms.do', singleSms.request)
                .reply(200, singleSms.response);

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
                .post('/', singleSms.request)
                .reply(200, singleSms.response);

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