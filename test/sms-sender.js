var should = require("should");
var nock = require('nock');
var nsmsapi = require('..');
var crypto = require('crypto');
var md5sum = crypto.createHash('md5');

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

    it('should send sms to default endpoint', function(done){

        var val = {
            username: 'test',
            password: '098f6bcd4621d373cade4e832627b4f6',
            format: 'json'
        };

        var scope = nock('https://ssl.smsapi.pl')
            .post('/sms.do', val)
            .reply(200, {id: 6060606060});

        var sender = new nsmsapi.SmsSender({
            username: 'test',
            password: 'test'
        });

        sender.send(function(err, res, body) {
            scope.done();
            done();
        });
    });

    it('should send sms to custom endpoint')
});