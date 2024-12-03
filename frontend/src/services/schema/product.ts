import {z} from "zod";

export const getOneProductSchema = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string().optional(),
	price: z.number(),
	category: z.object({
		id: z.number(),
		name: z.string(),
	}),
	createdAt: z.string(),
	updatedAt: z.string(),
})

export const getProductsSchema = z.array(getOneProductSchema)

export type Product = z.infer<typeof getOneProductSchema>