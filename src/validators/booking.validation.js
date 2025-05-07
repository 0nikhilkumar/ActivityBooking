import { z } from "zod"

export const bookingSchema = z.object({
    activityId: z.string().min(1, 'Activity ID is required')
});