import fileUploadProcessSlice from '@/redux/fileUploadProcessSlice'

describe('setProcess', function () {
    it('should set state process when called with payload', function () {
        const sourceProcess = { description : 'this is random object represent tusio instance'};
        const expectedProcess = {value: { description : 'this is random object represent tusio instance'}};
        const initialState = { value: null};
        const action = { type: 'fileUploadProcess/setProcess', payload: sourceProcess };
        const newState = fileUploadProcessSlice(initialState, action);
        expect(newState).toEqual(expectedProcess);
    });
});

describe('resetProcess', function () {
    it('should reset state process to null when called without payload', function () {
        const expectedProcess = null;
        const initialState = { value: null};
        const action = { type: 'fileUploadProcess/resetProcess'};
        const newState = fileUploadProcessSlice(initialState, action);
        expect(newState).toEqual({ value: expectedProcess});
    });
});