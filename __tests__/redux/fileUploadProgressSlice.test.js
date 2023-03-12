import fileUploadProgressSlice from '@/redux/fileUploadProgressSlice'

describe('updateUploadProgress', function () {
    it('should update progress state when called with string number as payload', function () {
        const sourceProgress = '1';
        const expectedProgress = 1;
        const initialState = { value: null};
        const action = { type: 'fileUploadProgress/updateUploadProgress', payload: sourceProgress };
        const newState = fileUploadProgressSlice(initialState, action);
        expect(newState).toEqual({ value: expectedProgress});
    });

    it('should update progress state when called with int number as payload', function () {
        const sourceProgress = 41;
        const expectedProgress = 41;
        const initialState = { value: null};
        const action = { type: 'fileUploadProgress/updateUploadProgress', payload: sourceProgress };
        const newState = fileUploadProgressSlice(initialState, action);
        expect(newState).toEqual({ value: expectedProgress});
    });
});