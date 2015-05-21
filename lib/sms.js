
Sms = function(recipients, message) {

    var recipients = guardRecipients(recipients)
    var message = message;

    this.getMessage = function () {
        return message;
    };

    this.getRecipients = function() {
        return recipients;
    };

    function guardRecipients(recipients) {

        var recipientsType = typeof recipients;

        function guardStringRecipients() {
            guardNotEmpty();

            return [recipients];
        }

        if (recipientsType === 'string') {
            return guardStringRecipients();
        }

        function guardNotEmpty() {
            if (!recipients.length) {
                throw new Error('Empty recipient');
            }
        }

        if (recipientsType === 'object' && recipients instanceof Array) {
            guardNotEmpty();

            return recipients;
        }

        throw new Error('Invalid recipient type');
    }
};

module.exports = Sms;



