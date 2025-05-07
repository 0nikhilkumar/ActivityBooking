import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const {name, email, phone, password} = req.body;

        if(!name || !email || !phone || !password) {
            return res.status(400).json(new ApiResponse(400, 'All fields are required'));
        }
        
        // * Check if user already exists or not
        const isUserExits = await User.findOne({ email })

        // * If user already exists
        if(isUserExits) {
            return res.status(400).json(new ApiResponse(400, 'User already exists'));
        }

        // * Create a new user, if user not exists
        const user = await User.create({
            name,
            email,
            phone,
            password
        });

        // * If user not created
        if(!user) {
            return res.status(400).json(new ApiResponse(400, 'User not created'));
        }

        // * User created successfully
        return res.status(201).json(new ApiResponse(201, 'User created successfully'));
    } catch (error) {
        return res.status(500).json(new ApiError(500, 'Internal Server Error', error));
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json(new ApiResponse(400, 'All fields are required'));
        }

        // * Check if user exists
        const user = await User.findOne({ email });

        // * If user not exists
        if(!user) {
            return res.status(400).json(new ApiResponse(400, 'User not found'));
        }

        // * Check if password is correct or not
        const isPasswordMatch = await user.comparePassword(password);

        // * If password is incorrect
        if(!isPasswordMatch) {
            return res.status(400).json(new ApiResponse(400, 'Invalid credentials'));
        }

        // * Generate JWT token for login user
        const token = `Bearer ${jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRY})}`;

        // * Login successful
        return res.status(200).cookie('token', token).json(new ApiResponse(200, 'Login successful', token));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, 'Internal Server Error', error));
    }
}