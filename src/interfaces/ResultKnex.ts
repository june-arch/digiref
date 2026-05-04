export interface ResultKnex<T> {
    data?: T,
    success: boolean;
    message?: string;
    code: number;
}