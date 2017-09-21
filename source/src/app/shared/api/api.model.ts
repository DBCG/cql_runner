export interface API {
    value: string;
    error: Error;
}

export enum ErrorType {
    execution,
    translation
}

export interface Error {
    type: ErrorType;
    message: string;
}