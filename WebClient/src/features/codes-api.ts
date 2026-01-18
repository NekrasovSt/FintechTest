import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiFinTechClientFactory} from "../api";
import {mapToDto, mapToModel} from "./codes-api.helpers.ts";
import type {RootState} from "../app/store.ts";
import type {CodeValue} from "./codes.types.ts";

const client = ApiFinTechClientFactory(undefined, "http://localhost:5056");


export const fetchCodes = createAsyncThunk<CodeValue[]>(
    'codes/fetchCodes',
    async () => {
        const response = await client.getCodes();
        return mapToModel(response.data);
    }
);

export const saveCodes = createAsyncThunk<CodeValue[], () => void, { state: RootState }>(
    'codes/saveCodes',
    async (fn, {getState}) => {
        const currentState = getState();
        const response = await client.addCodes(mapToDto(currentState.codes.newCodes));
        fn();
        return mapToModel(response.data);
    }
);
