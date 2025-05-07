import { Activity } from "../models/activity.model.js";
import { Booking } from "../models/booking.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const bookActivity = async (req, res) => {
    try {
        const { activityId } = req.body;
        const userId = req.user.id;

        if(!activityId) {
            return res.status(400).json(new ApiResponse(400, 'Activity ID is required'));
        }

        // * Check if activity exists or not
        const activity = await Activity.findById(activityId);
        if(!activity) {
            return res.status(404).json(new ApiResponse(404, 'Activity not found'));
        }

        // * Check if user has already booked this activity
        const existingBooking = await Booking.findOne({user: userId, activity: activityId});
        if(existingBooking) {
            return res.status(400).json(new ApiResponse(400, 'You have already booked this activity'));
        }

        // * Book an activity
        const booking = await Booking.create({user: userId, activity: activityId});

        // * If booking not done
        if(!booking) {
            return res.status(400).json(new ApiResponse(400, 'Booking not created'));
        }

        // * Booking created successfully
        return res.status(201).json(new ApiResponse(201, 'Booking created successfully', booking));

    } catch (error) {
        return res.status(500).json(new ApiResponse(500, 'Internal Server Error', error));
    }
};

export const getMyBookings = async (req, res) => {
    try {
        const userId = req.user.id;
    
        // * Get All My Bookings with already sorted
        const bookings = await Booking.find({user: userId}).populate({
            path: 'activity',
            select: 'title description location dateTime'
        }).sort({createdAt: -1});
    
        // * If no bookings found
        if(!bookings) {
            return res.status(404).json(new ApiResponse(404, 'Bookings not found'));
        }
    
        // * Booking Found Successfully
        return res.status(200).json(new ApiResponse(200, 'Bookings found', bookings));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, 'Internal Server Error', error));
    }
};