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

    it('should send sms to default endpoint', function(){

        var scope = nock('https://ssl.smsapi.pl')
            .post('/sms.do')
            .reply(200, 'OK');

        var sender = new nsmsapi.SmsSender({
            username: 'test',
            password: 'test'
        })

        sender.send(function(err, req, body) {
            console.log(body)
            scope.done();
            done();
        });
    });

    it('should send sms to custom endpoint')
});