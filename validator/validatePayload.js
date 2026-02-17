
exports.validatePayload = (schema) => {
    return (req, res, next) => {
        try {
            const { error } = schema.validate(req.body, { abortEarly: false });

            if (error) {
                // Format Joi errors into a readable message
                const errors = error.details.map((detail) => {
                    const errorMessage = detail.message.replace(/\"/g, '');
                    return `${errorMessage}`;
                });

                return res.status(400).json({
                    message: 'Validation failed',
                    errors,
                });
            }

            next();
        } catch (error) {
            console.error('Error in validatePayload:', error);
            return res.status(500).json({
                message: 'Internal server error',
                error: error.message || 'Error in validatePayload',
            });
        }
    };
};

