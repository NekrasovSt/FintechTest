import type {CodeResponseDto, CodeValueDto} from "../api";
import type {CodeValue, NewCodeValue} from "./codes.types.ts";

export const mapToModel = (dto: CodeResponseDto[]): CodeValue[] =>
    dto.map(i => ({id: i.order, value: i.value, order: i.order, code: i.code}));

export const mapToDto = (dto: NewCodeValue[]): CodeValueDto[] =>
    dto.map(i => ({value: i.value, code: i.code}));