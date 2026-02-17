class CustomError extends Error {
    constructor(message, statusCode = 500, details = {}, fullError = null) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        this.fullError = fullError;
    }
}

module.exports = { CustomError };
