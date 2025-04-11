const errorMiddleware = (err, req, res, next) => {
    console.error(`❌ Error: ${err.message}`); // Log the error

    const statusCode = err.statusCode || 500; // Default to 500 if no status code is set
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};

export default errorMiddleware;
