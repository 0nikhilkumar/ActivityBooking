import { ApiResponse } from "../utils/ApiResponse.js";

export const validate = (schema) => (req, res, next) => {
    try {
        const result = schema.parse(req.body);
        req.validatedData = result;
        next();
    } catch (error) {
        return res.status(400).json(new ApiResponse(400, 'Validation failed', error.errors));
    }
}