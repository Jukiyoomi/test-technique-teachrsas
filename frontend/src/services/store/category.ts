import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Category, getCategoriesSchema, getOneCategorySchema} from "#root/services/schema/category";

export const categoryApi = createApi({
	reducerPath: "category-api",
	baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_PUBLIC_API_URL}/category`}),
	tagTypes: ["category"],
	endpoints: (build) => ({
		getAllCategories: build.query<Category[], void>({
			query: () => "",
			transformResponse: (response: Category[]) => getCategoriesSchema.parse(response),
			providesTags: ["category"],
		}),
		getOneCategory: build.query<Category, number>({
			query: (id) => `/${id}`,
			transformResponse: (response: Category) => getOneCategorySchema.parse(response),
			providesTags: ["category"],
		}),
	}),
})

export const { useGetAllCategoriesQuery, useGetOneCategoryQuery } = categoryApi;