import { z } from "zod"

export const activitySchema = z.object({
    title: z.string().min(2, 'Title must be at least 2 characters'),
    description: z.string().min(2, 'Description must be at least 2 characters'),
    location: z.string().min(2, 'Location must be at least 2 characters'),
    dateTime: z.string()
});