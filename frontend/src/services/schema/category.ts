import {z} from "zod";

export const getOneCategorySchema = z.object({
	id: z.number(),
	name: z.string(),
	products: z.array(z.object({
		id: z.number(),
		name: z.string(),
		price: z.number(),
	}))
})

export const getCategoriesSchema = z.array(getOneCategorySchema)

export type Category = z.infer<typeof getOneCategorySchema>