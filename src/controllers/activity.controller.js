import { Activity } from "../models/activity.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

export const getAllActivities = async (req, res) => {
    try {
        // * Get all activities with sorted by dateTime
        const activities = await Activity.find().sort({dateTime: -1});

        // * If no activities found
        if(!activities) {
            return res.status(404).json(new ApiResponse(404, 'Activities not found'));
        }

        // * Activities Found Successfully
        return res.status(200).json(new ApiResponse(200, 'Activities found', activities));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, 'Internal Server Error', error));
    }
};

export const createActivity = async (req, res) => {
    try {
        const { title, description, location, dateTime } = req.body;

        if(!title || !description || !location || !dateTime) {
            return res.status(400).json(new ApiResponse(400, 'All fields are required'));
        }

        // * Create an activity
        const activity = await Activity.create({
            title,
            description,
            location,
            dateTime
        });

        // * If activity not created
        if(!activity) {
            return res.status(400).json(new ApiResponse(400, 'Activity not created'));
        }

        // * Activity created successfully
        return res.status(201).json(new ApiResponse(201, 'Activity created successfully', activity));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, 'Internal Server Error', error));
    }
}