import express, { Express, Request, Response, NextFunction } from "express";
import ApiError from "../helpers/ApiErrors.js"

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    }
    return res.status(500).json({ message: "unknown error" });
};