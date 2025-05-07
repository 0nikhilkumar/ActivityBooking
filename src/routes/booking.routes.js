import { Router } from "express"
import { validate } from "../middlewares/validation.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { bookingSchema } from "../validators/booking.validation.js";
import { bookActivity, getMyBookings } from "../controllers/booking.controller.js";
const router = Router();

router.route("/create-booking").post(authMiddleware, validate(bookingSchema), bookActivity);
router.route("/get-all-my-bookings").get(authMiddleware, getMyBookings);


export default router;