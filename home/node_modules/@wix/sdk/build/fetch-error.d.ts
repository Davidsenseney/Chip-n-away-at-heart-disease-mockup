export declare class FetchErrorResponse extends Error {
    readonly message: string;
    readonly response: Response;
    constructor(message: string, response: Response);
    details(): Promise<{
        details: any;
        message: string;
        requestId: any;
    }>;
}
