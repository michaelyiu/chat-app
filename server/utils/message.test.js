let expect = require('expect');

let { generateMessage } = require('./message');

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