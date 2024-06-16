const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorMiddleware = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
};

module.exports = { notFound, errorMiddleware };