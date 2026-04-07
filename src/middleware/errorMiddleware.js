const { Prisma } = require("@prisma/client");



// 404 not found handler
// Creates an error for routes that don't exist
const notFound = (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found`)
    error.statusCode = 404;
    next(error);
};

// Global error handler middleware
// Handles all errors in the application and send appropriate message
// Provides detailed error information in development, minimal info in production
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    // Handle prisma validation errors
    if (err instanceof Prisma.PrismaClientValidationError) {
        err.statusCode = 400;
        err.message = "Invalid data provided";
    }

    // Handle prisma unique constraint violations
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            const field = err.meta?.target?.[0] || "field";
            err.statusCode = 400;
            err.message = `${field} already exists`;
        }

        // Handle record not found
        if (err.code === "P2025") {
            err.statusCode = 404;
            err.message = "Record not found";
        }
    }

    // Handle prisma foreign key constraint violations
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2003") {
            err.statusCode = 400;
            err.message = "Invalid reference: related record does not exist";
        }
    }

    // Send error response 
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,

        // Only include stack trace in development
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};

module.exports = { notFound, errorHandler};