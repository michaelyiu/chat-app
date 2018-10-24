const expect = require('expect');
const { isRealString } = require('./validation');


describe('isRealString', () => {
    it('should be a real string', () => {
        let res = isRealString(98);
        expect(res).toBe(false);
    });

    it('should reject strings with only spaces', () => {
        let res = isRealString('        ');
        expect(res).toBe(false);
    })

    it('should allow string with non-space characters', () => {
        let res = isRealString('Michael');
        expect(res).toBe(true);
    })
})