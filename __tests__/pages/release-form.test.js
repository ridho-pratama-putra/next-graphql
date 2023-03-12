import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import ReleaseForm from '@/pages/forms/release-form'
import '@testing-library/jest-dom'
import {Provider} from "react-redux";
import {store} from "@/redux/store";
import { upload }from "@/lib/upload"
import {resetProcess} from "@/redux/fileUploadProcessSlice";


jest.mock('@/lib/upload');

describe('ReleaseForm', function () {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();

        // idk how to properly reset store, using existing action instead
        store.dispatch(resetProcess());
    });

    it('should render form with button submit, pause, resume and input field', function () {
        render(<Provider store={store}><ReleaseForm/></Provider>)
        const inputFileLabel = screen.getByTestId('label-input-file')
        const inputFile = screen.getByTestId('input-file')
        const buttonSubmit = screen.getByRole('button', {
            name: /submit/i,
        })
        const buttonPause = screen.getByRole('button', {
            name: /pause/i,
        })
        const buttonResume = screen.getByRole('button', {
            name: /resume/i,
        })

        expect(inputFileLabel).toBeInTheDocument()
        expect(inputFile).toBeInTheDocument()
        expect(buttonSubmit).toBeInTheDocument()
        expect(buttonResume).toBeInTheDocument()
        expect(buttonPause).toBeInTheDocument()
    });

    it('should disable input field & submit button when click submit', function (done) {
        render(<Provider store={store}><ReleaseForm/></Provider>)
        upload.mockResolvedValue(null);
        const inputFile = screen.getByTestId('input-file');
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        fireEvent.change(inputFile, {target: {files: [new File(['test'], 'test.txt', { type: 'text/plain' })],},});

        fireEvent.click(submitButton);

        waitFor(() => {
            expect(submitButton).toBeDisabled();
            expect(inputFile).toBeDisabled();
            done();
        });
    });

    it('should call start when click submit', function (done) {
        render(<Provider store={store}><ReleaseForm/></Provider>)
        const mockFindPreviousUploads = jest.fn().mockImplementationOnce(() => Promise.resolve([]));
        const mockStartUploads = jest.fn();
        upload.mockImplementation(() => Promise.resolve({
            start: mockStartUploads,
            findPreviousUploads: mockFindPreviousUploads
        }));
        const inputFile = screen.getByTestId('input-file');
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        fireEvent.change(inputFile, {target: {files: [new File(['test'], 'test.txt', { type: 'text/plain' })],},});

        fireEvent.click(submitButton);

        waitFor(() => {
            expect(mockStartUploads).toHaveBeenCalled();
            const state = store.getState();
            expect(state.fileUploadProcess).not.toBeNull();
            done();
        });
    });

    it('should call abort when click pause', function (done) {
        render(<Provider store={store}><ReleaseForm/></Provider>)
        const mockAbort = jest.fn();
        upload.mockImplementationOnce(() => Promise.resolve({
            start: jest.fn(),
            abort: mockAbort,
            findPreviousUploads: jest.fn().mockImplementationOnce(() => Promise.resolve([]))
        }));
        const inputFile = screen.getByTestId('input-file');
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        const pauseButton = screen.getByRole('button', { name: 'pause' });
        fireEvent.change(inputFile, {target: {files: [new File(['test'], 'test.txt', { type: 'text/plain' })],},});

        fireEvent.click(submitButton);

        waitFor(() => {
            fireEvent.click(pauseButton);
            expect(mockAbort).toHaveBeenCalled();
            const state = store.getState();
            expect(state.fileUploadProcess).not.toBeNull();
            done();
        });
    });

    it('should call resumeFromPreviousUpload when click resume', function (done) {
        render(<Provider store={store}><ReleaseForm/></Provider>);
        const mockResumeFromPreviousUpload = jest.fn();
        upload.mockImplementationOnce(() => Promise.resolve({
            start: jest.fn(),
            abort: jest.fn(),
            findPreviousUploads: jest.fn().mockImplementationOnce(() => Promise.resolve([1])),
            resumeFromPreviousUpload: mockResumeFromPreviousUpload,
        }));

        const inputFile = screen.getByTestId('input-file');
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        const pauseButton = screen.getByRole('button', { name: 'pause' });
        const resumeButton = screen.getByRole('button', { name: 'resume' });
        fireEvent.change(inputFile, {target: {files: [new File(['test'], 'test.txt', { type: 'text/plain' })],},});

        fireEvent.click(submitButton);
        fireEvent.click(pauseButton);
        fireEvent.click(resumeButton);
        waitFor(() => {
            const state = store.getState();
            expect(state.fileUploadProcess).not.toEqual({ value: null });
            expect(mockResumeFromPreviousUpload).toHaveBeenCalled();
            done();
        });
    });
});