// #!/usr/bin/env node
// const { Client, LocalAuth } = require('whatsapp-web.js');
//
// var qrcode = require('qrcode-terminal');
// // qrcode.generate('2@aw355DuaW0C2iVTDHQ+KEo/U2t1RLmAHSoRr4jVZ/BQdomESSGxnxvOfuDhnnBrcgpG3ksir4qaUOg==,5HPLrk+O7WLnf0t2SGa//vAMQUbQi8gWXIElHvScoQM=,dA5kX/Drh5p872SxTe+fR2UWRSXITtCXCNp5BqxMyTA=,LeUqTltPa0uA+iDuaZq/3jvKql5VbFxMioKCPN9H43E=', {
// // })
//
//
// //
// // const puppeteerOptions = {
// //     puppeteer: {
// //         args: ['--no-sandbox', '--disable-setuid-sandbox']
// //     }
// // };
// //
//
// const client = new Client({
//         clientId: '1',
//         authStrategy: new LocalAuth(),
//         puppeteer: { headless: false }
//     }
// );
// const client2 = new Client({
//         clientId: '2',
//         authStrategy: new LocalAuth(),
//         puppeteer: { headless: false }
//     }
// );
// //
// // client.initialize();
// // client2.initialize();
//
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
