import { NextFunction, Request, Response } from "npm:express";

/**
 * RFC 9457 Problem Details for HTTP APIs implementation in Express.js.
 * This utility provides a standard way to represent error conditions in HTTP APIs.
 * Usage:
 * 1. Include this middleware in your Express app to handle errors.
 * 2. Use `next(createError(404, 'Not Found', 'Description of the error'))` to trigger an error response.
 */

interface ProblemDetail {
    type: string;
    title: string;
    status: number;
    detail: string;
    [key: string]: unknown; // Allows for any number of additional fields.
}

export type ProblemDetailsNext = (err: {
    title: string;
    status: number;
    detail: string;
    [key: string]: unknown;
}) => void;

export function createProblemDetails(
    status: number,
    title: string,
    detail: string,
    additionalFields?: Record<string, unknown>,
): ProblemDetail {
    return {
        type: `https://httpstatuses.com/${status}`,
        title: title,
        status: status,
        detail: detail,
        ...additionalFields,
    };
}

// Middleware to send problem details as a response
export function problemDetailsHandler(
    err: ProblemDetail,
    _: Request,
    res: Response,
    next: NextFunction,
): void {
    if (res.headersSent) {
        return next(err);
    }

    if (!err.type) {
        err.type = `https://httpstatuses.com/${err.status}`;
    }

    res
        .status(err.status)
        .contentType("application/problem+json")
        .json(err);
}
