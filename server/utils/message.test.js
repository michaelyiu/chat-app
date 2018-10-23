let expect = require('expect');

let { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'chelsea';
        let text = 'hi there';
        let message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({ from, text });
        //store res in variable
        //assert from match
        // assert text match
        //assert createdAt is number
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from = "me";
        let lat = 15;
        let lng = 19;
        let url = 'https://www.google.com/maps?q=15,19';
        let locationMessage = generateLocationMessage(from, lat, lng);

        expect(typeof locationMessage.createdAt).toBe('number');
        expect(locationMessage).toMatchObject({from, url});
    })
})