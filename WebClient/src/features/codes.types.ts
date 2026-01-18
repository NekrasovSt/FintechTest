export interface CodeValue {
    code: number;
    value: string;
    order: number;
    id: number;
}

export interface NewCodeValue {
    code: number;
    value: string;
}

export interface CodesState {
    codes: CodeValue[];
    newCodes: NewCodeValue[];
    newCode: NewCodeValue;
    isLoaded: boolean;
    isLoading: boolean;
    error: boolean;
}