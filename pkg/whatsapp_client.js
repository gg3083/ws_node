// const {Client, LocalAuth} = require('whatsapp-web.js');
const { Client, RemoteAuth } = require('whatsapp-web.js');




const initClient = async  (clientId) => {
    console.log('start:', clientId)
}


module.exports = initClient;

//
// client.initialize();
// client2.initialize();

// client.on('qr', (qr) => {
//     // NOTE: This event will not be fired if a session is specified.
//     console.log('QR RECEIVED', qr);
//     qrcode.generate(qr, {});
// });
//
// client.on('authenticated', () => {
//     console.log('AUTHENTICATED');
// });
//
// client2.on('qr', (qr) => {
//     // NOTE: This event will not be fired if a session is specified.
//     console.log('QR RECEIVED2', qr);
//     qrcode.generate(qr, {});
// });
//
// client2.on('authenticated', () => {
//     console.log('AUTHENTICATED2');
// });
//
// client.on('auth_failure', msg => {
//     // Fired if session restore was unsuccessful
//     console.error('AUTHENTICATION FAILURE', msg);
// });
//
// client.on('ready', () => {
//     console.log('READY');
// });
//
// client2.on('ready', () => {
//     console.log('READY2');
// });
//
//
// client.on('message', async msg => {
//     console.log('MESSAGE RECEIVED', msg);
//
//     if (msg.body === '!ping reply') {
//         // Send a new message as a reply to the current one
//         msg.reply('pong');
//
//     }
// })
