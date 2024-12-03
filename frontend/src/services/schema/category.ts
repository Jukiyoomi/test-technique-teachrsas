import {z} from "zod";

export const getOneCategorySchema = z.object({
	id: z.number(),
	name: z.string(),
})

export const getCategoriesSchema = z.array(getOneCategorySchema)

export type Category = z.infer<typeof getOneCategorySchema>