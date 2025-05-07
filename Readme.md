# Activity Booking API

## Table of Contents
1. [Project Setup](#1-project-setup)
2. [Environment Configuration](#2-environment-configuration)
3. [Database Setup](#3-database-setup)
4. [Running the Application](#4-running-the-application)
5. [API Endpoints](#5-api-endpoints)
6. [Testing the API](#6-testing-the-api)
7. [Deployment](#7-deployment)
8. [Troubleshooting](#8-troubleshooting)


### Api Routes - 
Base Url - https://activitybooking-4jsh.onrender.com/api/v1 / localhost:3000/api/v1

User Register - /register
User Login - /login

Activity Get - /get-all-activities
Activity Create - /create-activity

Booking Get - /get-all-my-bookings
Booking Create - /create-booking

---

## 1. Project Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Postman (for API testing)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/activity-booking-api.git
   cd activity-booking-api

2. npm install

3. .env
    ``` bash
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/activity-booking
    JWT_SECRET=your_strong_secret_here
    JWT_EXPIRE=30d

4. npm run dev