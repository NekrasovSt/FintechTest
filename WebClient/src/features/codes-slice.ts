import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {fetchCodes, saveCodes} from './codes-api.ts';
import type {CodesState, CodeValue} from "./codes.types.ts";

const initialState: CodesState = {
    codes: [],
    newCodes: [],
    isLoaded: false,
    isLoading: false,
    newCode: {code: 0, value: ''},
    error: false
};

export const codesSlice = createSlice({
    name: 'codes',
    initialState,
    reducers: {
        addCode: (state) => {
            state.newCodes.push({...state.newCode});
            state.newCode.code = 0;
            state.newCode.value = '';
        },
        updateCode: (state, action: PayloadAction<number>) => {
            state.newCode.code = action.payload;
        },
        updateValue: (state, action: PayloadAction<string>) => {
            state.newCode.value = action.payload;
        },
        deleteCode: (state, action: PayloadAction<number>) => {
            state.newCodes.splice(action.payload, 1);
        },
        clearCodes: (state) => {
            state.newCodes = [];
            state.newCode.code = 0;
            state.newCode.value = '';
        },
        clearError: (state) => {
            state.error = false;
        },

        generateRandomCodes: (state) => {
            const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

            state.newCodes = Array.from({length: 100}, (_, index: number) => ({
                code: index,
                value: Array.from({length: 8}, () => symbols.charAt(Math.floor(Math.random() * symbols.length))).join(''),
            }));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCodes.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchCodes.fulfilled, (state, action: PayloadAction<CodeValue[]>) => {
                state.isLoading = false;
                state.codes = action.payload;
                state.isLoaded = true;
            })
            .addCase(fetchCodes.rejected, (state, _) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(saveCodes.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(saveCodes.fulfilled, (state, action: PayloadAction<CodeValue[]>) => {
                state.isLoading = false;
                state.codes = action.payload;
                state.newCodes = [];
                state.newCode = {code: 0, value: ''};
                state.isLoaded = true;
            })
            .addCase(saveCodes.rejected, (state, _) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const {
    addCode,
    updateCode,
    deleteCode,
    updateValue,
    generateRandomCodes,
    clearCodes,
    clearError
} = codesSlice.actions;

export default codesSlice.reducer;