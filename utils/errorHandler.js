const { CustomError } = require('./CustomError');

const errorHandler = (err, req, res, next) => {
    console.error(err);

    // If already a CustomError
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            details: err.details || null,
        });
    }

    // Fallback (unexpected errors)
    return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
};

module.exports = errorHandler;
