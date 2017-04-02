import { chidiom } from './chidiom';

describe('chidiom', () => {
    it('has name', () => {
        let chidiom: chidiom = {id: 1, name: 'Super Cat'};
        expect(chidiom.name).toEqual('Super Cat');
    });
    it('has id', () => {
        let chidiom: chidiom = {id: 1, name: 'Super Cat'};
        expect(chidiom.id).toEqual(1);
    });
});
