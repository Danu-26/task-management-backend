const { CustomError } = require('./CustomError');

exports.handleServiceError = (error, defaultMessage = "An error occurred", defaultStatusCode = 500) => {
    // Preserve existing CustomError
    if (error instanceof CustomError) {
        return error;
    }

    // Compose more descriptive message
    const message = `${defaultMessage}${error?.message ? `: ${error.message}` : ""}`;

    return new CustomError(message, defaultStatusCode, null, error);
};
