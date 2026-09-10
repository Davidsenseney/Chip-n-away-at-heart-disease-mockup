export class FetchErrorResponse extends Error {
    message;
    response;
    constructor(message, response) {
        super(message);
        this.message = message;
        this.response = response;
    }
    async details() {
        const dataError = await this.response.json();
        return errorBuilder(this.response.status, dataError?.message, dataError?.details, {
            requestId: this.response.headers.get('X-Wix-Request-Id'),
            details: dataError,
        });
    }
}
const errorBuilder = (code, description, details, data) => {
    return {
        details: {
            ...(!details?.validationError && {
                applicationError: {
                    description,
                    code,
                    data,
                },
            }),
            ...details,
        },
        message: description,
        requestId: data?.requestId,
    };
};
