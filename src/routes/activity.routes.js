import { Router } from "express"
import { validate } from "../middlewares/validation.middleware.js";
import { createActivity, getAllActivities } from "../controllers/activity.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { activitySchema } from "../validators/activity.validation.js";

const router = Router();

router.route("/get-all-activities").get(getAllActivities);
router.route("/create-activity").post(authMiddleware, validate(activitySchema), createActivity);

export default router;