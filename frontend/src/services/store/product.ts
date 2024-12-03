import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getProductsSchema, getOneProductSchema, type Product} from "#root/services/schema/product";

export const productApi = createApi({
	reducerPath: "product-api",
	baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_PUBLIC_API_URL}/product`}),
	tagTypes: ["product"],
	endpoints: (build) => ({
		getAllProducts: build.query<Product[], void>({
			query: () => "",
			transformResponse: (response: Product[]) => getProductsSchema.parse(response),
			providesTags: ["product"],
		}),
		getOneProduct: build.query<Product, number>({
			query: (id) => `/${id}`,
			transformResponse: (response: Product) => getOneProductSchema.parse(response),
			providesTags: ["product"],
		}),
	}),
})

export const { useGetAllProductsQuery, useGetOneProductQuery, usePrefetch } = productApi;