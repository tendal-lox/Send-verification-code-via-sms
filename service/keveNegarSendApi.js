var Kavenegar = require('kavenegar');
var api = Kavenegar.KavenegarApi({
    apikey: 'your-apikey'
});

module.exports = function sendMail (phoneNumber, generatedCode) {
    // Kavenegar send api
    const api = Kavenegar.KavenegarApi({apikey: 'my kevenegar api key'});
    api.Send({ message: generatedCode , sender: "my sender" , receptor: phoneNumber });
}